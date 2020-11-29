from api.models.m_users import User
from django.db import models

class Bitacora(models.Model):
    usuario = models.ForeignKey(User, related_name="bitacoras",  blank=True ,on_delete=models.deletion.CASCADE)
    accion = models.CharField(max_length=200, null=True)
    detalle = models.TextField(null=True, blank=True)
    detalle_anterior = models.TextField(null=True, blank=True)
    descripcion = models.CharField(max_length=255, null=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)