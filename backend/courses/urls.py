from django.urls import path
from .views import CourseListView, CourseDetailView

urlpatterns = [
    path('', CourseListView.as_view(), name='course-list'),   # api/courses
    path('<int:pk>/', CourseDetailView.as_view(), name='course-detail'),  # api/courses/1/
]
