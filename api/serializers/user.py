from rest_framework import serializers
# from django.contrib.auth.models import User
from api.models.m_users import User
from api.models import Profile, AsignacionProyectoUsuario
import jwt
from rest_framework.settings import api_settings
from django.conf import settings


class ProfileSerializer(serializers.ModelSerializer):

    #   categoria = serializers.SerializerMethodField("getCategoria")

    class Meta:
        model = Profile
        fields = '__all__'
        # depth=1

    # def getCategoria(self, obj):
    #     return {'value': obj.categoria.id, 'label': obj.categoria.nombre}


class UserSerializer(serializers.ModelSerializer):

    # profile = ProfileSerializer(required=False)
    idCategoria = serializers.SerializerMethodField("getCategoria")
    idRoles = serializers.SerializerMethodField("getRoles")
    proyecto = serializers.SerializerMethodField("getProyectosUsuarios")
    scrum_master = serializers.SerializerMethodField("getScrum")
    idPuesto = serializers.SerializerMethodField("getPuesto")

    class Meta:
        model = User
        fields = (
            'id',
            'first_name',
            'last_name',
            'email',
            'phone',
            'activo',
            # 'is_verify',
            'idCategoria',
            'idRoles',
            'proyecto',
            'scrum_master',
            'idPuesto'
        )
        depth = 1

    def getCategoria(self, obj):
        if(obj.idCategoria is not None):
            return {'value': obj.idCategoria.id, 'label': obj.idCategoria.nombre}
        return None

    def getScrum(self, obj):
        if(obj.scrum_master is not None):
            return {'value': obj.scrum_master.id,
                        'label': obj.scrum_master.first_name + ' ' + obj.scrum_master.last_name}
        return None
    
    def getPuesto(self, obj):
        if (obj.idPuesto is not None):
            print(f'puesto {obj.idPuesto}')
            return {'value': obj.idPuesto.id, 'label': obj.idPuesto.nombre}
        return None

    def getRoles(self, obj):
        if(obj.idRoles is not None):
            return {'value': obj.idRoles.id, 'label': obj.idRoles.nombre}
        return None
        # extra_kwargs = {
        #     'email': {'required': True}
        # }s

    def getProyectosUsuarios(self, obj):
        try:
            asignaciones = obj.asignacion_usuarios.all()
            formato = []
            for asignacion in asignaciones:
                formato.append({
                    "value": asignacion.idProyecto.id,
                    "label": asignacion.idProyecto.nombre
                })
            return formato
        except AsignacionProyectoUsuario.DoesNotExist:
            return []


class UserSerializerProyectos(serializers.ModelSerializer):

    proyecto = serializers.SerializerMethodField("getProyectosUsuarios")

    class Meta:
        model = User
        fields = (
            'id',
            'proyecto'

        )
        depth = 1

    def getProyectosUsuarios(self, obj):
        try:
            asignaciones = obj.asignacion_usuarios.all()
            formato = []
            for asignacion in asignaciones:
                formato.append({
                    "value": asignacion.idProyecto.id,
                    "label": asignacion.idProyecto.nombre
                })
            return formato
        except:
            return []


class UserSerializerCrear(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            'id',
            'first_name',
            'last_name',
            # 'profile',
            'email',
            # 'password',
            'phone',
            # 'idCategoria',
            # 'idRoles'
        )

        # extra_kwargs = {
        #     'email': {'required': True}
        # }


class UserReadSerializer(serializers.ModelSerializer):
    # profile = ProfileSerializer(required=False)
    idRoles = serializers.SerializerMethodField("getRoles")

    class Meta:
        model = User
        fields = (
            'id',
            'first_name',
            'last_name',
            'is_superuser',
            'is_staff',
            'email',
            'phone',
            # 'profile',
            'activo',
            'is_verify',
            # 'idCategoria',
            'idRoles',

        )

    def getRoles(self, obj):
        if(obj.idRoles is not None):
            return {'nombre': obj.idRoles.nombre, 'id': obj.idRoles.id}
        return None


class UserUpdateSerializer(serializers.ModelSerializer):
    # profile = ProfileSerializer(required=False)
    # proyecto = serializers.SerializerMethodField("getProyectosUsuarios")
    class Meta:
        model = User
        fields = (
            'id',
            'first_name',
            'last_name',
            'email',
            'phone',
            'activo',
            # 'is_verify',
            'idCategoria',
            'idRoles',
            # 'proyecto',
        )

    # def getProyectosUsuarios(self, obj):
    #     try:
    #         asignaciones = obj.asignacion_usuarios.all()
    #         formato = []
    #         for asignacion in asignaciones :
    #             formato.append({
    #                 "value": asignacion.idProyecto.id,
    #                 "label": asignacion.idProyecto.nombre
    #             })
    #         return formato
    #     except AsignacionProyectoUsuario.DoesNotExist:
    #         return []


class UserUpdateSerializerForeing(serializers.ModelSerializer):
    # profile = ProfileSerializer(required=False)

    class Meta:
        model = User
        fields = (
            'id',
            'first_name',
            'last_name',
            'phone',
            'activo',
            # 'is_verify',
            # 'idCategoria',
            # 'idRoles'

        )


class UserAccountVerificationSerializer(serializers.Serializer):
    """User Account verification by token
    """
    token = serializers.CharField()

    def validate_token(self, data):
        """Validate token
        here we validate that the token is correct and it is valid
        """
        try:
            payload = jwt.decode(data, settings.SECRET_KEY,
                                 algorithms=['HS256'])
        except jwt.ExpiredSignature:
            raise serializers.ValidationError('verification link has expired')
        except jwt.PyJWTError:
            raise serializers.ValidationError('Invalid Token')
        if payload['type'] != 'email_confirmation':
            raise serializers.ValidationError('Invalid Token')

        self.context['payload'] = payload

    def save(self):
        """Update the verification status in user"""
        payload = self.context['payload']
        user = User.objects.get(email=payload['user'])
        user.is_verify = True
        user.save()
