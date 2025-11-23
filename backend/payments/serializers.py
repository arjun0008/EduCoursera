from rest_framework import serializers
from .models import PurchasedCourse

class PurchasedCourseSerializer(serializers.ModelSerializer):
    course_name = serializers.CharField(source="course.name", read_only=True)
    course_description = serializers.CharField(source="course.description", read_only=True)
    course_price = serializers.DecimalField(source="course.price", max_digits=10, decimal_places=2, read_only=True)
    course_image = serializers.CharField(source="course.image_url", read_only=True)

    class Meta:
        model = PurchasedCourse
        fields = ["id", "course_name", "course_description", "course_price", "course_image", "purchased_at"]
