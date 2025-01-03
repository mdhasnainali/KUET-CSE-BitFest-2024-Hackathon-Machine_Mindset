from django.urls import path
from main.views import TestView

urlpatterns = [
    path("", TestView.as_view(), name="test"),
]
