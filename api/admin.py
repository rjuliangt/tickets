from django.contrib import admin
from .models.m_users import User
from .models.m_profile import Profile
from .models.m_permiso import Permiso

admin.site.register(User)
admin.site.register(Permiso)

admin.site.register(Profile)

