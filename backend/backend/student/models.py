from django.db import models
from django.conf import settings


class Student(models.Model):
    student = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="teacher"
    )
    name = models.CharField(max_length=100)
    roll = models.CharField(max_length=100)
    level = models.CharField(max_length=100)

    def __str__(self) -> str:
        return f"{self.agency_name} {self.agent.email}"
