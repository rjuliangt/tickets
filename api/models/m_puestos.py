""" Modelo Puesto """
from django.db import models

class Puestos(models.Model):
    # campos propios del modelo
    nombre = models.TextField()

    # campos basicos del modelo
    activo = models.BooleanField(default=True) 
    creadoPor = models.IntegerField(null=True, blank=True)
    actualizadoPor = models.IntegerField(null=True, blank=True)
    creado = models.DateTimeField(auto_now_add=True)
    actualizado = models.DateTimeField(auto_now=True)


    def __str__(self):
        # funcion para definir que se devuelve 
        return f'{self.id} {self.nombre}'

    def delete(self, *args):
        #cambiar la forma de eliminar 
        self.active = False
        self.save()
        return True
