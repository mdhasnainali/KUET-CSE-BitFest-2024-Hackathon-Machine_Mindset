from rest_framework.permissions import BasePermission
from dj_rest_auth.registration.views import RegisterView
from student.serializers import StudentRegistrationSerializer


class AuthenticateOnlyStudent(BasePermission):
    def has_permission(self, request, view):
        if request.user and request.user.is_authenticated:
            if request.user.is_student:
                return True
            else:
                return False

        return False

class StudentRegistrationView(RegisterView):
    serializer_class = StudentRegistrationSerializer
