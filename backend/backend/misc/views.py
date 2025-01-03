from teacher.models import Content, Teacher

# serializers
from misc.serializers import SearchSerializer, ChatBotSerializer
from teacher.serializers import (
    ContentSerializer,
    ProfileSerializer,
)

# for rest api
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q

# import utilities
from misc.utils import (
    contains_bangla_script,
    get_gemini_response,
    process_text_with_llm_endpoint,
)


class PublicContentView(APIView):
    """
    CRUD Operations for Content
    Using LLM FastAPI on Create and Update
    """

    serializer_class = ContentSerializer

    def get(self, request, content_id=None, *args, **kwargs):
        if content_id:
            content = Content.objects.get(id=content_id)
            if content.public:
                serializer = ContentSerializer(content)
                return Response(serializer.data)
            return Response({"error": "Content is private"}, status=404)

        content = Content.objects.filter(public=True)
        serializer = ContentSerializer(content, many=True)
        return Response(serializer.data)


class SearchContentView(APIView):
    """
    Search in title and caption
    """

    def post(self, request, *args, **kwargs):
        serializer = SearchSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=400)

        search_text = serializer.validated_data.get("search_text")

        # content searching
        content = Content.objects.filter(
            Q(title__icontains=search_text) | Q(caption__icontains=search_text),
            public=True,
        )
        content_serializer = ContentSerializer(content, many=True)

        # teacher searching
        teacher = Teacher.objects.filter(name__icontains=search_text)
        teacher_serializer = ProfileSerializer(teacher, many=True)

        return Response(
            {"contents": content_serializer.data, "teachers": teacher_serializer.data}
        )


class ChatBotView(APIView):
    """
    ChatBot, Bangla text directly interacts with Gemini,
    Banglish text goes to LLM API for translation, then to Gemini
    """

    def post(self, request, *args, **kwargs):
        serializer = ChatBotSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=400)

        message = serializer.validated_data.get("message")
        msg_str = ""

        if serializer.validated_data.get("content_id"):
            content_id = serializer.validated_data.get("content_id")
            content = Content.objects.get(id=content_id)
            msg_str = (
                "Based on this Bangla content: \n\n```"
                + content.bangla
                + "```\n\n"
                + "Answer to this query: \n\n"
            )

        if contains_bangla_script(message):
            response = get_gemini_response(msg_str + message)
            return Response({"message": response})

        else:
            response = process_text_with_llm_endpoint(message)
            print(response)
            if response:
                response = get_gemini_response(msg_str + response)
                print(response)
                return Response({"message": response})

        return Response(
            {"message": "Something went wrong, please try again with a valid query"},
            status=400,
        )
