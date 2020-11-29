from rest_framework import serializers

from api.models.m_tickets import Tickets

from api.models.m_comentarios import Comentarios


class ComentarioActualizarModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comentarios
        # fields = ('contenido', 'idTicket', 'idAutor')
        fields = ('contenido', 'comentario')


class ComentariosCrearModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comentarios
        # fields = ('contenido', 'idTicket', 'idAutor')
        fields = ('__all__')


class ComentariosLeerModelSerializer(serializers.ModelSerializer):
    idAutor = serializers.SerializerMethodField("getidAutor")

    idTicket = serializers.SerializerMethodField("getidTicket")

    idUsuarioCliente = serializers.SerializerMethodField()

    class Meta:
        model = Comentarios
        fields = ('id', 'idAutor', 'idTicket', 'contenido',
                  'comentario', 'creado', 'actualizado', 'idUsuarioCliente')
        # fields = ('__all__')
        depth = 1

    def getidAutor(self, obj):
        if(obj.idAutor is not None):
            if(obj.idAutor.idRoles is not None):
                rol = obj.idAutor.idRoles.nombre
            else:
                rol = "null"

            return {'nombre': obj.idAutor.first_name+" " + obj.idAutor.last_name, 'id': obj.idAutor.id,  'rol': rol}
        return None

    def getidTicket(self, obj):
        if(obj.idTicket is not None):
            return obj.idTicket.id
        return None

    def get_idUsuarioCliente(self, obj):
        if(obj.idTicket is not None):
            ticket = Tickets.objects.get(id=obj.idTicket.id)
            return {'nombre': ticket.idUsuarioCliente.first_name+" " + ticket.idUsuarioCliente.last_name, 'email': ticket.idUsuarioCliente.email}
        return None
