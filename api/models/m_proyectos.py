from api.models.empresa import Empresa

from django.db import models

class Proyecto(models.Model):
    # idUsuario = models.ForeignKey(User, related_name="bitacoras",  blank=True ,on_delete=models.deletion.CASCADE)
    nombre = models.CharField(max_length=200, null=True)
    idEmpresa = models.ForeignKey(Empresa, related_name="Empresa",blank=True, null=True ,on_delete=models.deletion.CASCADE)
    estado= models.TextField(max_length=255, null=True)
    fechaInicio = models.DateTimeField(auto_now_add=True)
    fechaFin = models.DateTimeField(auto_now_add=True)
 
    activo = models.BooleanField(default=True)
    creadoPor = models.TextField(null=True, blank=True)
    modificadoPor = models.TextField(null=True, blank=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)