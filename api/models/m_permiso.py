from django.db import models


class Permiso(models.Model):
      nombre = models.CharField(max_length=25)

      # campos basicos del modelo
      activo = models.BooleanField(default=True) 
      creado = models.DateTimeField(auto_now_add=True)
      actualizado = models.DateTimeField(auto_now=True)