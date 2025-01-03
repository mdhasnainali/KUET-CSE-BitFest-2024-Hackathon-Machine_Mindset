from rest_framework.permissions import BasePermission
from dj_rest_auth.registration.views import RegisterView
from student.serializers import StudentRegistrationSerializer, ProfileSerializer

# for rest api
from rest_framework.views import APIView
from rest_framework.response import Response




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


class ProfileView(APIView):
    """
    Get and update student profile
    """

    permission_classes = [AuthenticateOnlyStudent]
    serializer_class = ProfileSerializer

    def get(self, request, *args, **kwargs):
        student = request.user.student
        serializer = ProfileSerializer(student)
        return Response(serializer.data)

    def put(self, request, *args, **kwargs):
        student = request.user.student
        serializer = ProfileSerializer(student, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
