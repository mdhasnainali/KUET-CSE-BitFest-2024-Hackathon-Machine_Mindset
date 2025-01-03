from django.urls import path
from misc.views import PublicContentView, SearchContentView, ChatBotView

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
        name="registration_student",
    ),
    path(
        "chatbot/",
        ChatBotView.as_view(),
        name="registration_student",
    ),
]
