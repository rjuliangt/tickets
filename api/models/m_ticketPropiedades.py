from django.db import models


class ModelBasic(models.Model):
    nombre = models.CharField(max_length=250)
    activo = models.BooleanField(default=True)
    creadoPor = models.IntegerField
    actualizadoPor = models.IntegerField
    creado = models.DateTimeField(auto_now_add=True)
    actualizado = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Etiquetas(ModelBasic):
    def __str__(self):
        return f'{self.id} {self.nombre}'


class Tipos(ModelBasic):
    def __str__(self):
        return f'{self.id} {self.nombre}'


class Estados(ModelBasic):
    color = models.CharField(max_length=7, default="#000000")

    def __str__(self):
        return f'{self.id} {self.nombre}'


class Prioridades(ModelBasic):
    color = models.CharField(max_length=7, default="#000000")

    def __str__(self):
        return f'{self.id} {self.nombre}'
