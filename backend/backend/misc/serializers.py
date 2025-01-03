from rest_framework import serializers


class SearchSerializer(serializers.Serializer):
    search_text = serializers.CharField(max_length=255, required=True)


class ChatBotSerializer(serializers.Serializer):
    content_id = serializers.IntegerField(required=False)
    message = serializers.CharField(max_length=500, required=True)
