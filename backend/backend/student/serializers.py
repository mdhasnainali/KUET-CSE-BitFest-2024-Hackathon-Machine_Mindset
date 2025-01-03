from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from student.models import Student


# Custom Registration
class StudentRegistrationSerializer(RegisterSerializer):
    student = serializers.PrimaryKeyRelatedField(
        read_only=True,
    )  # by default allow_null = False
    name = serializers.CharField(required=True)
    roll = serializers.CharField(required=True)
    level = serializers.IntegerField(required=True)

    def get_cleaned_data(self):
        data = super(StudentRegistrationSerializer, self).get_cleaned_data()
        extra_data = {
            "name": self.validated_data.get("name", ""),
            "roll": self.validated_data.get("roll", ""),
            "level": self.validated_data.get("level", ""),
        }
        data.update(extra_data)
        return data

    def save(self, request):
        user = super(StudentRegistrationSerializer, self).save(request)
        user.is_student = True
        user.save()
        student = Student(
            student=user,
            name=self.validated_data.get("name"),
            roll=self.validated_data.get("roll"),
            level=self.validated_data.get("level"),
        )
        student.save()
        return user
