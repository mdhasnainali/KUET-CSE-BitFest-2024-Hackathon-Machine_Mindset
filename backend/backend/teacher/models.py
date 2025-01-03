from django.db import models
from django.conf import settings


class Teacher(models.Model):
    teacher = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="teacher"
    )
    name = models.CharField(max_length=100)
    subject = models.CharField(max_length=100)

    def __str__(self) -> str:
        return f"{self.teacher.name} {self.teacher.email}"


class Content(models.Model):
    teacher = models.ForeignKey(
        Teacher, on_delete=models.CASCADE, related_name="content"
    )
    title = models.CharField(max_length=100)
    caption = models.CharField(max_length=500)
    banglish = models.TextField()
    bangla = models.TextField()
    pdf_file = models.FileField(upload_to="pdfs/")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.title
