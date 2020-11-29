from django.db import models
# from django.contrib.auth.models import User
from api.models.m_users import User


class Profile(models.Model):

    MALE = 0
    FEMALE = 1

    GENDERS = (
        (MALE, 'MALE'),
        (FEMALE, 'FEMALE')
    )

    user = models.OneToOneField(
            User, on_delete=models.CASCADE, related_name="profile")
    # scrum_master = models.ForeignKey(User, blank=True, null=True, on_delete=models.CASCADE, related_name='user_scrum')
    idCategoria = models.IntegerField()
    
    idRoles = models.IntegerField()

    idEmpresa = models.IntegerField()

    activo = models.BooleanField(default=False)

    creado = models.DateTimeField(auto_now_add=True)

    modificado = models.DateTimeField(auto_now=True)

    creadoPor = models.IntegerField(null=True, blank=True) 

    modificadoPor = models.IntegerField(null=True, blank=True) 


    # def __unicode__(self):
    #     return self.user.last_login

    def delete(self, *args):
        user = self.user
        user.is_active = False
        user.save()
        self.active = False
        self.save()
        return True
