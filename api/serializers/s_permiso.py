from rest_framework import serializers

from api.models.m_permiso import Permiso

class PermisoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permiso
        fields = '__all__'

class PermisoCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permiso
        fields = (
                'nombre',
            )

class PermisoReadSerializer(serializers.ModelSerializer):
    asignado = serializers.BooleanField(default=False)

    class Meta:
        model = Permiso
        fields = (
                'id',
                'nombre',
                'asignado',
            )

