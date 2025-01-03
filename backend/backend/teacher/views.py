from rest_framework.permissions import BasePermission
from dj_rest_auth.registration.views import RegisterView
from teacher.serializers import TeacherRegistrationSerializer


class AuthenticateOnlyStudent(BasePermission):
    def has_permission(self, request, view):
        if request.user and request.user.is_authenticated:
            if request.user.is_teacher:
                return True
            else:
                return False

        return False


class TeacherRegistrationView(RegisterView):
    serializer_class = TeacherRegistrationSerializer
