from rest_framework import serializers
from api.models.m_ticketPropiedades import (
    Tipos,
    Estados,
    Prioridades,
    Etiquetas
)
from api.models.m_users import User


class UsuarioModelSerializer(serializers.ModelSerializer):

    nombre = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = (
            'id',
            'first_name',
            'last_name',
            'nombre'
        )

    def get_nombre(self, obj):
        return '{} {}'.format(obj.first_name, obj.last_name)


class EtiquetasModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Etiquetas
        fields = '__all__'


class TiposModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tipos
        fields = '__all__'


class EstadosModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Estados
        fields = '__all__'


class PrioridadesModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Prioridades
        fields = '__all__'
