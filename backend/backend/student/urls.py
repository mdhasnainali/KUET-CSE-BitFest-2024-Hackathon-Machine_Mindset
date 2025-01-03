from django.urls import path
from student.views import StudentRegistrationView

urlpatterns = [
    path(
        "registration/",
        StudentRegistrationView.as_view(),
        name="registration_student",
    ),
]
