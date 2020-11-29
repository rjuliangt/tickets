from django.db import models
# from django.contrib.auth.models import User

from api.models.m_ticketPropiedades import (
    Tipos,
    Estados,
    Prioridades,
    Etiquetas
)
from api.models.m_categorias import Categorias

from api.models.m_users import User
from api.models.m_proyectos import Proyecto
from datetime import datetime, date, time, timedelta


class Tickets(models.Model):

    asunto = models.TextField()
    descripcion = models.TextField()
    reabierto = models.IntegerField(default=0)  # nuevo campo para bandera
    activo = models.BooleanField(default=True)
    idTipo = models.ForeignKey(
        Tipos, on_delete=models.CASCADE, null=True, blank=True, default=None)

    idEstado = models.ForeignKey(
        Estados, on_delete=models.CASCADE, null=True, blank=True, default=None)

    idPrioridad = models.ForeignKey(
        Prioridades, on_delete=models.CASCADE, null=True, blank=True, default=None)

    idGrupo = models.ForeignKey(
        Categorias, on_delete=models.CASCADE, null=True, blank=True, default=None)

    idEtiquetas = models.ManyToManyField(
        Etiquetas,   blank=True, default=None)

    idProyecto = models.ForeignKey(
        Proyecto, on_delete=models.CASCADE, null=True, blank=True, default=None,  related_name="idProyectoCliente")

    # = = = = = = = = = = = = = = = = = = == = =
    # usuario Cliente
    idUsuarioCliente = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True, default=None,  related_name="idUsuarioCliente")

    # usuario Asignado
    idUsuarioAsignado = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True, default=None, related_name="idUsuarioAsignado")

    # usuario Resuelto
    idUsuarioResuelto = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True, default=None, related_name="idUsuarioResuelto")

    # = = = = = = = = = = = = = = = = = = == = =
    # escalculado
    horasHabilies = models.CharField(max_length=25, null=True, blank=True)

    # no tiene que ver el cliente, si se acepta el ticket o no
    aprobado = models.BooleanField(default=False, null=True, blank=True)

    # no tiene que ver el cliente, (empr)
    cicloVida = models.CharField(max_length=25, null=True, blank=True)

    estadoFusion = models.BooleanField(
        default=False,
        null=True
    )
    EstadoPrincipal = models.BooleanField(
        default=False,
        null=True
    )

    horasTrabajadas = models.TimeField(
        max_length=25, null=True, blank=True)  # cambiar por number
    # horasTrabajadas = models.DurationField(
    #     'HH:MM:SS', null=True, blank=True)  # 

    fechafin = models.DateTimeField(
        null=True, blank=True)  # fecha que finaliza el programador a trabajar el ticket
    fechaInicio = models.DateTimeField(
        null=True, blank=True)  # fecha que inicia el programador a trabajar el ticket
    creadoPor = models.IntegerField(null=True, blank=True)
    actualizadoPor = models.IntegerField(null=True, blank=True)
    creado = models.DateTimeField(auto_now_add=True)
    actualizado = models.DateTimeField(auto_now=True)

    REQUIRED_FIELDS = ['asunto', 'descripcion', 'idUsuarioCliente']

    def __unicode__(self):
        return self.asunto

    def delete(self, *args):  # no permitir eliminar
         self.activo = False
         self.save()
         return True
