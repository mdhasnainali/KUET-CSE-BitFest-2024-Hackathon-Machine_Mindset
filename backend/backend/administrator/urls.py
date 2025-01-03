from django.urls import path
from administrator.views import ContributionView, StudentListAPIView, TeacherListAPIView

urlpatterns = [
    path("contribution/", ContributionView.as_view(), name="contribution"),
    path(
        "contribution/<int:contribution_id>",
        ContributionView.as_view(),
        name="contribution",
    ),
    path("students/", StudentListAPIView.as_view(), name="student"),
    path("students/<int:student_id>", StudentListAPIView.as_view(), name="student"),
    path("teachers/", TeacherListAPIView.as_view(), name="teacher"),
    path("teachers/<int:teacher_id>", TeacherListAPIView.as_view(), name="teacher"),
]
