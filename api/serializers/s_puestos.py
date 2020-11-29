from rest_framework import serializers

from api.models.m_puestos import Puestos


class PuestoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Puestos
        fields = '__all__'

class PuestoCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Puestos
        fields = (
                'nombre',
            )

class PuestoReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Puestos
        fields = (
                'id',
                'nombre',
            )
