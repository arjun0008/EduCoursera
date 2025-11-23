from django.db import models
from django.contrib.auth.models import User
from courses.models import Course

class CartItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="cart_items")
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'course')  # prevents duplicate cart items

    def __str__(self):
        return f"{self.user.username} - {self.course.name}"
