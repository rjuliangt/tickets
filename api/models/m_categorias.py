from django.db import models
# from django.contrib.auth.models import User


class Categorias(models.Model):

    nombre = models.CharField(max_length=250)
    creadoPor = models.IntegerField(null=True, blank=True)
    actualizadoPor = models.IntegerField(null=True, blank=True)
    creado = models.DateTimeField(auto_now_add=True)
    actualizado = models.DateTimeField(auto_now=True)
    activo = models.BooleanField(default=True) #campo agregado

    def __unicode__(self):
        return self.nombre

    def delete(self, *args):
        self.activo = False
        self.save()
        return True
