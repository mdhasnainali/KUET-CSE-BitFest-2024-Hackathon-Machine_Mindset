from django.urls import path
from teacher.views import TeacherRegistrationView

urlpatterns = [
    path(
        "registration/",
        TeacherRegistrationView.as_view(),
        name="registration_student",
    ),
]
