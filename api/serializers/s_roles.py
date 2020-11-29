from rest_framework import serializers

from api.models.m_roles import Roles

class RolesModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Roles
        fields = '__all__'


class CreateModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roles
        fields = ['nombre']

