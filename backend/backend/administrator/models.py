from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    # Boolean fields to select the type of account.
    is_admin = models.BooleanField(default=False)
    is_teacher = models.BooleanField(default=False)
    is_student = models.BooleanField(default=False)

    def __str__(self):
        return self.username


class Contribution(models.Model):
    # The user who made the contribution.
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    banglish = models.TextField()
    bangla = models.TextField()
    added_at = models.DateTimeField(auto_now_add=True)
    approved = models.BooleanField(default=False)
