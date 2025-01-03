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
    Search Content
    """

    def post(self, request, *args, **kwargs):
        serializer = SearchSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=400)

        search_text = serializer.validated_data.get("search_text")
        content = Content.objects.filter(
            Q(title__icontains=search_text) | Q(description__icontains=search_text),
            public=True,
        )
        serializer = ContentSerializer(content, many=True)
        return Response(serializer.data)


class ChatBotView(APIView):
    """
    ChatBot
    """

    def post(self, request, *args, **kwargs):
        serializer = ChatBotSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=400)

        return Response(
            {
                "message": "Hello! I am a ChatBot. I am here to help you. How can I help you today?"
            }
        )