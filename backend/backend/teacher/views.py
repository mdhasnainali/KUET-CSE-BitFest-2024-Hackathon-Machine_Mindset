from rest_framework.permissions import BasePermission
from dj_rest_auth.registration.views import RegisterView
from teacher.serializers import (
    TeacherRegistrationSerializer,
    ProfileSerializer,
    ContentSerializer,
)
from teacher.models import Content

# for rest api
from rest_framework.views import APIView
from rest_framework.response import Response
from misc.utils import (
    process_text_with_llm_endpoint,
    generate_title_and_caption,
    export_pdf,
)
from django.utils import timezone
import os

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

    # step 1: process banglish to bangla
    # step 2: generate title and caption
    # step 3: export to pdf
    # step 4: save to db
    def post(self, request, *args, **kwargs):
        teacher = request.user.teacher
        serializer = ContentSerializer(data=request.data)
        if serializer.is_valid():
            banglish = serializer.validated_data.get("banglish")
            bangla = process_text_with_llm_endpoint(banglish)
            title_caption = generate_title_and_caption(banglish)
            title = title_caption.get("title")
            caption = title_caption.get("caption")

            pdf_file_path = export_pdf(                
                title=title,
                caption=caption,
                body=bangla,
                date=timezone.now(),
                author=teacher.name,
            )
            print("---------------- POST ---------------")
            print(title, caption, bangla)
            print("-----------------------------------")

            content_obj = Content.objects.create(
                teacher=teacher,
                title=title,
                caption=caption,
                banglish=banglish,
                bangla=bangla,
                pdf_file=pdf_file_path,
                public=serializer.validated_data.get("public"),
            )

            return Response(ContentSerializer(content_obj).data, status=201)
        return Response(serializer.errors, status=400)

    def put(self, request, content_id=None, *args, **kwargs):
        if not content_id:
            return Response({
                "message": "Content ID is required"
            }, status=400)

        teacher = request.user.teacher
        content = teacher.content.get(id=content_id)
        serializer = ContentSerializer(content, data=request.data)
        if serializer.is_valid():

            banglish = serializer.validated_data.get("banglish")
            public = serializer.validated_data.get("public")

            if banglish != content.banglish:
                # if banglish is changed, regenerate bangla, title, caption and pdf
                bangla = process_text_with_llm_endpoint(banglish)
                title_caption = generate_title_and_caption(banglish)
                title = title_caption.get("title")
                caption = title_caption.get("caption")

                pdf_file_path = export_pdf(
                    title=title,
                    caption=caption,
                    body=bangla,
                    date=timezone.now(),
                    author=teacher.name,
                )
                print("--------------- PUT -----------------")
                print(title, caption, bangla)
                print("-----------------------------------")

                content.title = title
                content.caption = caption
                content.banglish = banglish
                content.bangla = bangla
                content.pdf_file = pdf_file_path
                content.public = public
                content.save()

            else:
                content.public = public
                content.save()

            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete(self, request, content_id=None, *args, **kwargs):
        if not content_id:
            return Response({
                "message": "Content ID is required"
            }, status=400)

        teacher = request.user.teacher
        content = teacher.content.get(id=content_id)
        filename = f"media/{content.pdf_file}"
        print(filename)
        content.delete()

        # delete pdf file from disk
        if os.path.exists(filename):
            os.remove(filename)

        return Response({
            "message": "Content deleted successfully"
        }, status=204)
