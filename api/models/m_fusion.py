from django.db import models
from api.models.m_tickets import Tickets
from api.models.m_users import User


class Fusion(models.Model):

    idTicketPrincipal = models.ForeignKey(
        Tickets, on_delete=models.CASCADE, related_name="idTicketPrincipal")
    idTicketFusion = models.ForeignKey(
        Tickets, on_delete=models.CASCADE)

    creadoPor = models.IntegerField
    actualizadoPor = models.IntegerField
    creado = models.DateTimeField(auto_now_add=True)
    actualizado = models.DateTimeField(auto_now=True)
