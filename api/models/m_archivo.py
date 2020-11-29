from django.db import models
from api.models import Tickets


class Archivos(models.Model):
    ticket = models.ForeignKey(Tickets, on_delete=models.CASCADE, related_name="archivos_ticket")
    archivo = models.FileField(upload_to='Archivos', null=True, blank=True)

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return self.archivo
        
    def delete(self, *args):        
        self.activo = False
        self.save()
        return True