from rest_framework import serializers

from api.models.m_fusion import Fusion


class FusionModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Fusion
        fields = '__all__'
