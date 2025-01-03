# miscellaneous imports
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

# models
from administrator.models import Contribution

# serializers
from administrator.serializers import (
    ContributionSerializer,
    ContributionApprovalSerializer,
)

# for logging in
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

# for email confirmation
from allauth.account.views import ConfirmEmailView
from allauth.account.models import EmailConfirmationHMAC, EmailConfirmation
from django.shortcuts import redirect
from django.http import HttpResponse


class LoginWthPermission(APIView):

    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        password = request.data.get("password")

        # Authenticate the user
        user = authenticate(request, email=email, password=password)
        if not user:
            return Response(
                {"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
            )

        # Generate tokens
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        # Construct the response
        response_data = {
            "access": access_token,
            "refresh": str(refresh),
            "user": {
                "pk": user.pk,
                "username": user.username,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
            },
            "role": (
                "TEACHER"
                if user.is_teacher
                else ("STUDENT" if user.is_student else "ADMIN",)
            ),
        }

        return Response(response_data, status=status.HTTP_200_OK)


# Custom Confirm Email View
class CustomConfirmEmailView(ConfirmEmailView):

    def get(self, *args, **kwargs):
        key = kwargs["key"]
        try:
            confirmation = EmailConfirmationHMAC.from_key(key)
        except EmailConfirmation.DoesNotExist:
            try:
                confirmation = EmailConfirmation.objects.get(key=key.lower())
            except EmailConfirmation.DoesNotExist:
                confirmation = None

        if confirmation:
            confirmation.confirm(self.request)
            return redirect("https://petconnect-1-26xc.onrender.com/confirmation-email")
        else:
            return HttpResponse("Invalid or expired token", status=400)


class ContributionView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        contributions = Contribution.objects.filter(approved=False)
        serializer = ContributionSerializer(contributions, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = ContributionSerializer(data=request.data)
        if serializer.is_valid():
            Contribution.objects.create(**serializer.data, user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, contribution_id, *args, **kwargs):
        if not request.user.is_admin:
            return Response(
                "You are not authorized to perform this action",
                status=status.HTTP_401_UNAUTHORIZED,
            )

        contribution = Contribution.objects.get(id=contribution_id)
        serializer = ContributionApprovalSerializer(data=request.data)
        if serializer.is_valid():
            contribution.approved = serializer.data["approved"]
            contribution.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, contribution_id=None, *args, **kwargs):
        if not contribution_id:
            return Response(
                "Contribution ID is required", status=status.HTTP_400_BAD_REQUEST
            )

        if not request.user.is_admin:
            return Response(
                "You are not authorized to perform this action",
                status=status.HTTP_401_UNAUTHORIZED,
            )

        contribution = Contribution.objects.get(id=contribution_id)
        contribution.delete()
        return Response(
            "Contribution deleted Successfully", status=status.HTTP_204_NO_CONTENT
        )
