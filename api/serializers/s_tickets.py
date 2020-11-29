from rest_framework import serializers
from api.models.m_tickets import Tickets
from api.serializers.s_imagenes import ImagenesSerializer


class TicketSerializer(serializers.ModelSerializer):
    idUsuarioCliente = serializers.SerializerMethodField("getidUsuarioCliente")
    idUsuarioAsignado = serializers.SerializerMethodField("getidUsuarioAsignado")
    idUsuarioResuelto = serializers.SerializerMethodField("getidUsuarioResuelto")

    class Meta:
        model = Tickets
        fields = '__all__'
        depth = 1

    def getidUsuarioCliente(self, obj):
        if(obj.idUsuarioCliente is not None):
            return {'nombre': obj.idUsuarioCliente.first_name+" " + obj.idUsuarioCliente.last_name, 'id': obj.idUsuarioCliente.id, 'email': obj.idUsuarioCliente.email}
        return None

    def getidUsuarioAsignado(self, obj):
        if(obj.idUsuarioAsignado is not None):
            return {'nombre': obj.idUsuarioAsignado.first_name + " " + obj.idUsuarioAsignado.last_name, 'id': obj.idUsuarioAsignado.id}
        return None

    def getidUsuarioResuelto(self, obj):
        if(obj.idUsuarioResuelto is not None):
            return {'nombre': obj.idUsuarioResuelto.first_name + " " + obj.idUsuarioResuelto.last_name, 'id': obj.idUsuarioResuelto.id}
        return None


class TicketRegistroSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tickets
        fields = '__all__'

class TicketAprobadoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tickets
        fields = '__all__'


class TicketLecturaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tickets
        fields = '__all__'
        # fields = (
        #     'asunto',
        #     'idUsuarioCliente',
        #     'idUsuarioAsignado',
        #     'idUsuarioResuelto',

        # )


class TicketLecturaQuillSerializer(serializers.ModelSerializer):
    imagenes_comentario = ImagenesSerializer(many=True)

    class Meta:
        model = Tickets
        fields = '__all__'
