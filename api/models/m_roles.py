from django.db import models
from django.contrib.auth.models import User
from api.models.m_permiso import Permiso

class Roles(models.Model):

    nombre = models.CharField(max_length=250)
    permisos = models.ManyToManyField(Permiso)

    creadoPor = models.IntegerField
    actualizadoPor = models.IntegerField
    creado = models.DateTimeField(auto_now_add=True)
    actualizado = models.DateTimeField(auto_now=True)
