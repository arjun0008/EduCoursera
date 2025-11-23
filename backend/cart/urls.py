from django.urls import path
from .views import AddToCartView, ViewCartView, RemoveCartItemView

urlpatterns = [
    path('add/', AddToCartView.as_view(), name="add-to-cart"),
    path('', ViewCartView.as_view(), name="view-cart"),
    path('remove/<int:pk>/', RemoveCartItemView.as_view(), name="remove-cart"),
]
