from django.db import models
# from django.contrib.auth.models import User
from api.models import Proyecto, User 


class AsignacionProyectoUsuario(models.Model):
    idUsuario = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True,default = None,related_name="asignacion_usuarios")
    idProyecto = models.ForeignKey(Proyecto, on_delete=models.CASCADE, null=True, blank=True,default = None,related_name="asignacion_proyectos")