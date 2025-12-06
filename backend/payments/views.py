import stripe
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.db import transaction
from django.contrib.auth.models import User
from cart.models import CartItem
from courses.models import Course
from .models import Payment, PurchasedCourse

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import PurchasedCourseSerializer

stripe.api_key = settings.STRIPE_SECRET_KEY


class CreateCheckoutSession(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user

        cart_items = CartItem.objects.filter(user=user)
        if not cart_items.exists():
            return JsonResponse({"error": "Cart is empty"}, status=400)

        line_items = []
        total_amount = 0

        for item in cart_items:
            line_items.append({
                "price_data": {
                    "currency": "usd",
                    "product_data": {"name": item.course.name},
                    "unit_amount": int(item.course.price * 100),
                },
                "quantity": 1
            })
            total_amount += item.course.price

        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            mode="payment",
            line_items=line_items,
            success_url=settings.FRONTEND_SUCCESS_URL,
            cancel_url=settings.FRONTEND_CANCEL_URL,
            metadata={"user_id": user.id}
        )

        # Save payment record immediately
        Payment.objects.create(
            user=user,
            stripe_session_id=session.id,
            amount=total_amount
        )

        return JsonResponse({"sessionId": session.url,})
    


@csrf_exempt
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META.get("HTTP_STRIPE_SIGNATURE")
    
    # 1. Signature Verification
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
    except ValueError as e:
        # Invalid payload
        return HttpResponse(f"Invalid payload: {e}", status=400)
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        return HttpResponse(f"Webhook signature verification failed: {e}", status=400)
    except Exception:
        # Catch all other exceptions during construction
        return HttpResponse(status=400)


    # 2. Event Handling
    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        user_id_str = session.get("metadata", {}).get("user_id")

        if not user_id_str:
            # Important: Log missing metadata, return 200 so Stripe doesn't retry
            print("Webhook received with missing user_id in metadata.")
            return HttpResponse(status=200)

        try:
            user_id = int(user_id_str)
        except ValueError:
            # Handle non-integer user_id
            print(f"Invalid user_id format: {user_id_str}")
            return HttpResponse(status=200)

        # Use transaction.atomic to ensure all DB operations succeed or fail together
        try:
            with transaction.atomic():
                # Get the user (use get for a single object, catch DoesNotExist)
                user = User.objects.get(id=user_id)
                cart_items = CartItem.objects.filter(user=user)

                # Add purchased courses
                for item in cart_items:
                    PurchasedCourse.objects.get_or_create(
                        user=user,
                        course=item.course
                    )

                # Clear cart
                cart_items.delete()
                
        except User.DoesNotExist:
            print(f"User with ID {user_id} not found during purchase processing.")
        except Exception as e:
            # General error during database operations
            print(f"Error processing purchase for user {user_id}: {e}")
            # If a database error occurs, we might want to return 400 
            # to signal Stripe to retry, but be cautious with retries.

    # 3. Always return 200 for successful receipt of the webhook, 
    # even if you didn't process the event type.
    return HttpResponse(status=200)


class PurchasedCoursesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        purchased = PurchasedCourse.objects.filter(user=request.user)
        serializer = PurchasedCourseSerializer(purchased, many=True)
        return Response(serializer.data)
