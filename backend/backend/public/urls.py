from django.urls import path
from public.views import PublicContentView, SearchContentView

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
]
