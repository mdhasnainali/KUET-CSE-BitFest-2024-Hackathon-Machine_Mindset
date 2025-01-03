from rest_framework.permissions import BasePermission
from dj_rest_auth.registration.views import RegisterView
from teacher.serializers import (
    TeacherRegistrationSerializer,
    ProfileSerializer,
    ContentSerializer,
)

# for rest api
from rest_framework.views import APIView
from rest_framework.response import Response


class AuthenticateOnlyTeacher(BasePermission):
    def has_permission(self, request, view):
        if request.user and request.user.is_authenticated:
            if request.user.is_teacher:
                return True
            else:
                return False

        return False


class TeacherRegistrationView(RegisterView):
    serializer_class = TeacherRegistrationSerializer


class ProfileView(APIView):
    """
    Get and update teacher profile
    """

    permission_classes = [AuthenticateOnlyTeacher]
    serializer_class = ProfileSerializer

    def get(self, request, *args, **kwargs):
        teacher = request.user.teacher
        serializer = ProfileSerializer(teacher)
        return Response(serializer.data)

    def put(self, request, *args, **kwargs):
        teacher = request.user.teacher
        serializer = ProfileSerializer(teacher, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)


class ContentManagementView(APIView):
    """
    CRUD Operations for Content
    Using LLM FastAPI on Create and Update
    """

    permission_classes = [AuthenticateOnlyTeacher]
    serializer_class = ContentSerializer

    def get(self, request, *args, **kwargs):
        if request.query_params.get("content_id"):
            content_id = int(request.query_params.get("content_id"))
            teacher = request.user.teacher
            content = teacher.content.get(id=content_id)
            serializer = ContentSerializer(content)
            return Response(serializer.data)

        teacher = request.user.teacher
        content = teacher.content.all()
        serializer = ContentSerializer(content, many=True)
        return Response(serializer.data)    


    def post(self, request, *args, **kwargs):
        teacher = request.user.teacher
        serializer = ContentSerializer(data=request.data)
        if serializer.is_valid():
            # TODO: post banglish to LLM FastAPI
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def put(self, request, content_id=None, *args, **kwargs):
        if not content_id:
            return Response("Content ID is required", status=400)

        teacher = request.user.teacher
        content = teacher.content.get(id=content_id)
        serializer = ContentSerializer(content, data=request.data)
        if serializer.is_valid():
            # TODO: update banglish to LLM FastAPI
            # serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete(self, request, content_id=None, *args, **kwargs):
        if not content_id:
            return Response("Content ID is required", status=400)

        teacher = request.user.teacher
        content = teacher.content.get(id=content_id)
        content.delete()
        return Response(status=204)
