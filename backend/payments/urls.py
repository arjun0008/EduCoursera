from django.urls import path
from .views import CreateCheckoutSession, stripe_webhook
from .views import PurchasedCoursesView

#optional
from django.http import JsonResponse 

# def success(request):
#     return JsonResponse({"message": "Payment success placeholder"})

# def cancel(request):
#     return JsonResponse({"message": "Payment canceled placeholder"})


urlpatterns = [
    path('payments/create-checkout-session/', CreateCheckoutSession.as_view(), name="create-checkout"),
    path('payments/webhook/', stripe_webhook, name="stripe-webhook"),
    path("purchased/", PurchasedCoursesView.as_view(), name="purchased-courses"),

    # # optional
    # path("success/", success),
    # path("cancel/", cancel),

]
