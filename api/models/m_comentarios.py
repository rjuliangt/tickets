from django.db import models
from api.models.m_tickets import Tickets
from api.models.m_users import User


class Comentarios(models.Model):

    contenido = models.TextField()

    # comentario=TRUE es decir que es un comentario y tiene la opcion para poder enviar correo
    # comentario=FALSE es decir es una NOTA, es privada
    comentario = models.BooleanField(default=True, null=True, blank=True)

    idAutor = models.ForeignKey(
        User, on_delete=models.CASCADE)
    idTicket = models.ForeignKey(
        Tickets, on_delete=models.CASCADE, related_name='comentariosTicket')

    creadoPor = models.IntegerField
    actualizadoPor = models.IntegerField
    creado = models.DateTimeField(auto_now_add=True)
    actualizado = models.DateTimeField(auto_now=True)
