from django.urls import path
from administrator.views import ContributionView

urlpatterns = [
    path("contribution/", ContributionView.as_view(), name="contribution"),
    path("contribution/<int:contribution_id>", ContributionView.as_view(), name="contribution"),
]
