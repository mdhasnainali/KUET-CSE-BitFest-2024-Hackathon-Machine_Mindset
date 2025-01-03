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
    level = serializers.CharField(required=True)
    image_url = serializers.URLField(required=False, allow_null=True)

    def get_cleaned_data(self):
        data = super(StudentRegistrationSerializer, self).get_cleaned_data()
        extra_data = {
            "name": self.validated_data.get("name", ""),
            "roll": self.validated_data.get("roll", ""),
            "level": self.validated_data.get("level", ""),
            "image_url": self.validated_data.get("image_url", ""),
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
            image_url=self.validated_data.get("image_url"),
        )
        student.save()
        return user


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ["name", "roll", "level", "image_url", "id"]
        read_only_fields = ["id"]       
