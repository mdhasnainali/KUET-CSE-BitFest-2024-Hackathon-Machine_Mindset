from django.urls import path
from misc.views import (
    PublicContentView,
    SearchContentView,
    ChatBotView,
    AllTeachersView,
)

urlpatterns = [
    path(
        "contents/",
        PublicContentView.as_view(),
        name="registration_student",
    ),
    path(
        "contents/<int:content_id>/",
        PublicContentView.as_view(),
        name="registration_student",
    ),
    path(
        "search/",
        SearchContentView.as_view(),
        name="search",
    ),
    path(
        "chatbot/",
        ChatBotView.as_view(),
        name="search",
    ),
    path(
        "all-teachers/",
        AllTeachersView.as_view(),
        name="all_teachers",
    ),
    path(
        "all-teachers/<int:teacher_id>/",
        AllTeachersView.as_view(),
        name="all_teachers",
    ),
]
