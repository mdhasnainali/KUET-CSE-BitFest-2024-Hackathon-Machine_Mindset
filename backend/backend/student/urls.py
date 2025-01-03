from django.urls import path
from student.views import StudentRegistrationView, ProfileView

urlpatterns = [
    path(
        "registration/",
        StudentRegistrationView.as_view(),
        name="registration_student",
    ),
    path(
        "profile/",
        ProfileView.as_view(),
        name="profile_student",
    ),
    
]
