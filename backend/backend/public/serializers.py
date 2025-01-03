from rest_framework import serializers


class SearchSerializer(serializers.Serializer):
    search_text = serializers.CharField(max_length=255, required=True)
    
