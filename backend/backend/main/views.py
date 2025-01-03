from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from rest_framework.views import APIView, Response, status
from django.conf import settings


class TestView(APIView):
    def get(self, request):
        key = "OPENAI_SECRET_KEY"
        return JsonResponse({"message": key})

    def post(self, request):
        return JsonResponse({"message": "Hello, World!"})
