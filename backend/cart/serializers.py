from rest_framework import serializers
from .models import CartItem
from courses.serializers import CourseSerializer

class CartItemSerializer(serializers.ModelSerializer):
    course = CourseSerializer(read_only=True)

    class Meta:
        model = CartItem
        fields = ['id', 'course', 'added_at']
