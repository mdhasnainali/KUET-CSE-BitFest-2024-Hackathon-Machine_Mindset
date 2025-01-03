from django.db import models
from django.conf import settings


class Student(models.Model):
    student = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="student"
    )
    name = models.CharField(max_length=100)
    roll = models.CharField(max_length=100)
    level = models.CharField(max_length=100)
    image_url = models.URLField(blank=True, null=True)

    def __str__(self) -> str:
        return f"{self.student} {self.student.email}"
