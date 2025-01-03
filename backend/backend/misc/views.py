from teacher.models import Content

# serializers
from misc.serializers import SearchSerializer, ChatBotSerializer
from teacher.serializers import (
    ContentSerializer,
)

# for rest api
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q

# import utilities
from misc.utils import contains_bangla_script, get_gemini_response


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
        content = Content.objects.filter(
            Q(title__icontains=search_text) | Q(caption__icontains=search_text),
            public=True,
        )
        serializer = ContentSerializer(content, many=True)
        return Response(serializer.data)


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
        if contains_bangla_script(message):
            response = get_gemini_response(message)
            return Response(response)

        return Response(
            {
                "message": "Hello! I cant understand Banglish. Please write in Bangla.",
            }
        )
