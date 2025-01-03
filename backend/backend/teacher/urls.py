from django.urls import path
from teacher.views import TeacherRegistrationView, ProfileView, ContentManagementView, AnalyticsView

urlpatterns = [
    path(
        "registration/",
        TeacherRegistrationView.as_view(),
        name="registration_student",
    ),
    path(
        "profile/",
        ProfileView.as_view(),
        name="profile_teacher",
    ),
    path(
        "content-management/",
        ContentManagementView.as_view(),
        name="content_management",
    ),
    path(
        "content-management/<int:content_id>",
        ContentManagementView.as_view(),
        name="content_management",
    ),
    path(
        "analytics/",
        AnalyticsView.as_view(),
        name="analytics",
    ),
]
