from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from teacher.models import Teacher


# Custom Registration
class TeacherRegistrationSerializer(RegisterSerializer):
    teacher = serializers.PrimaryKeyRelatedField(
        read_only=True,
    )  # by default allow_null = False
    name = serializers.CharField(required=True)
    subject = serializers.CharField(required=True)

    def get_cleaned_data(self):
        data = super(TeacherRegistrationSerializer, self).get_cleaned_data()
        extra_data = {
            "name": self.validated_data.get("name", ""),
            "subject": self.validated_data.get("subject", ""),
        }
        data.update(extra_data)
        return data

    def save(self, request):
        user = super(TeacherRegistrationSerializer, self).save(request)
        user.is_teacher = True
        user.save()
        teacher = Teacher(
            teacher=user,
            name=self.validated_data.get("name"),
            subject=self.validated_data.get("subject"),
        )
        teacher.save()
        return user
