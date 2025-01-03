from administrator.models import Contribution
from rest_framework import serializers


class ContributionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contribution
        fields = "__all__"
        read_only_fields = ("user",)
        depth = 1


class ContributionApprovalSerializer(serializers.Serializer):
    approved = serializers.BooleanField()
