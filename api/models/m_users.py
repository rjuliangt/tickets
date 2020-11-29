"""Users model"""
# django
from django.contrib.auth.models import AbstractUser
from django.db import models

from api.models.m_categorias import Categorias
from api.models.m_roles import Roles
from api.models.m_puestos import Puestos


class User(AbstractUser):
    """User class
    Used the AbstractUser as it's base and Utilities
    extend the functionality.
    """

    username = models.CharField(
        max_length=25, null=True, blank=True, default=None)

    email = models.CharField(
        max_length=50,
        unique=True,
        error_messages={
            'unique': 'A user with that email already exists.'
        }
    )
    avatar = models.ImageField(upload_to='Avatar', null=True, blank=True)
    scrum_master = models.ForeignKey('self', blank=True, null=True, on_delete=models.CASCADE, related_name='user_scrum')

    phone = models.CharField(max_length=15, null=True, blank=True)

    is_verify = models.BooleanField(
        default=False,
        help_text='Set to true when the user have verified its email address'
    )

    activo = models.BooleanField(default=False)

    idCategoria = models.ForeignKey(
        Categorias, on_delete=models.CASCADE, null=True, blank=True, default=None)

    idRoles = models.ForeignKey(
        Roles, on_delete=models.CASCADE, null=True, blank=True, default=None)
    
    idPuesto = models.ForeignKey(
        Puestos, on_delete=models.CASCADE, null=True, blank=True, default=None
    )
    # profile = models.CharField(null=True,blank=True)
    creado = models.DateTimeField(auto_now_add=True)

    modificado = models.DateTimeField(auto_now=True)

    creadoPor = models.IntegerField(null=True, blank=True)

    modificadoPor = models.IntegerField(null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', ]

    def __str__(self):
        return f'{self.first_name} {self.last_name}'
