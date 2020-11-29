import json

from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
# from django.contrib.auth.models import User
from api.models.m_users import User
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings

from api.models import Profile, Categorias, Roles, AsignacionProyectoUsuario, Proyecto, Puestos
from api.serializers import UserSerializer, UserReadSerializer, UserUpdateSerializer, UserSerializerCrear, UserUpdateSerializerForeing

# from api.utils.sendEmail import enviarEmail
from django.core.mail import EmailMultiAlternatives
from datetime import timedelta
from django.utils import timezone
import jwt
from django.conf import settings
from django.template.loader import render_to_string
from django.core.mail import send_mail
from api.serializers.user import UserAccountVerificationSerializer
from copy import deepcopy
from django.db import transaction
# email api sengrid
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.filter(is_active=True)

    filter_backends = (DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("email", "first_name", 'last_name', "idRoles__nombre")
    search_fields = ("email", "first_name", 'last_name', "idRoles__nombre")
    ordering_fields = ("email", "first_name", 'last_name')

    def get_serializer_class(self):
        """Define serializer for API"""
        # if self.action == 'list' or self.action == 'retrieve':
        #     return UserUpdateSerializer
        if self.action == 'list':
            return UserUpdateSerializer
        elif self.action == 'update':
            return UserUpdateSerializer
            # return UserSerializerCrear
        else:
            return UserSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        if self.action in ['list', 'create', 'token', 'verification']:
            permission_classes = [AllowAny]

        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):
        data = request.data
        # datos = 5
        print("data: ", data)
        proyectos2 = data.get('proyecto', [])
        # categoria = None
        try:
            with transaction.atomic():
                serializer = UserSerializerCrear(data=request.data)
                if (serializer.is_valid()):
                    categoria = None
                    rol = None
                    activo = False
                    puesto = None
                    if(data.get('idCategoria')):
                        id = data.get('idCategoria').get('value')
                        categoria = Categorias.objects.get(pk=id)
                    if(data.get('idRoles')):
                        idRoles = data.get('idRoles').get('value')
                        rol = Roles.objects.get(pk=idRoles)
                    if (data.get('activo')):
                        activo = data.get('activo')
                    scrum_master = None
                    if (data.get('scrum_master')):
                        id_scrum = data.get('scrum_master').get('value')
                        scrum_master = User.objects.get(pk=id_scrum)
                    if (data.get('idPuesto')):
                        id_puesto = data.get('idPuesto').get('value')
                        puesto = Puestos.objects.get(pk=id_puesto)

                    usuario = User.objects.create(
                        idCategoria=categoria,
                        first_name=data.get('first_name'),
                        last_name=data.get('last_name'),
                        email=data.get('email'),
                        phone=data.get('phone'),
                        activo=activo,
                        idRoles=rol,
                        scrum_master=scrum_master,
                        idPuesto=puesto
                    )
                    # print('Log: *** {}'.format(usuario))
                    usuario.set_password(data.get('password'),)
                    usuario.save()
                    user_proy = User.objects.get(pk=usuario.id)

                    for proyecto in proyectos2:
                        # asignacionProyectoUsuario es mi modelo
                        id_pk = proyecto.get("value")
                        try:
                            instancia_proyecto = Proyecto.objects.get(pk=id_pk)
                            print(f'los datos del proyecto son {instancia_proyecto}')
                            asigandos = AsignacionProyectoUsuario.objects.get_or_create(
                                idUsuario=user_proy, idProyecto=instancia_proyecto)
                            asigandos.save()
                        except:
                            print('error en instaciado: 169')
                    # self.sending_emial(usuario, True) #Activar para poder enviar email
                    userResponse = [{'id':usuario.id, 'nombre': usuario.first_name}]
                    return Response(userResponse, status=status.HTTP_201_CREATED)
                else:
                    return Response({'detalle': 'error'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detalle': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        data = request.data
        proyectos2 = data.get('proyecto', [])
        try:
            with transaction.atomic():
                serializer = UserSerializerCrear(data=request.data)
                if serializer.is_valid():
                    print('es valido')
                else:
                    print('noo es valido')
                try:
                    usuario = User.objects.filter(pk=request.data["id"])
                except:
                    print('Error line 128 user view, no se encontro el usuario')
                categoria = None
                rol = None
                activo = False
                puesto = None
                if(data.get('idCategoria')):
                    id = data.get('idCategoria').get('value')
                    categoria = Categorias.objects.get(pk=id)
                if(data.get('idRoles')):
                    idRoles = data.get('idRoles').get('value')
                    rol = Roles.objects.get(pk=idRoles)
                if (data.get('activo')):
                    activo = data.get('activo')
                scrum_master = None
                if (data.get('scrum_master')):
                    id_scrum = data.get('scrum_master').get('value')
                    scrum_master = User.objects.get(pk=id_scrum)
                if (data.get('idPuesto')):
                    id_puesto = data.get('idPuesto').get('value')
                    puesto = Puestos.objects.get(pk=id_puesto)
               
                usuario.update(
                    idCategoria=categoria,
                    first_name=data.get('first_name'),
                    last_name=data.get('last_name'),
                    email=data.get('email'),
                    phone=data.get('phone'),
                    activo=activo,
                    idRoles=rol,
                    scrum_master=scrum_master,
                    idPuesto=puesto
                )
                user_proy = User.objects.filter(pk=request.data["id"]).first()
                for proyecto in proyectos2:
                    # asignacionProyectoUsuario es mi modelo
                    id_pk = proyecto.get("value")
                    try:
                        instancia_proyecto = Proyecto.objects.filter(pk=id_pk).first()
                        asigando = AsignacionProyectoUsuario.objects.get_or_create(
                            idUsuario=user_proy, idProyecto=instancia_proyecto)
                        asigando.save()
                    except:
                        print('error en instaciado: 169')
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'detalle': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def sending_emial(self, user, cambiar):
        """functions that sends the email verification"""
        token = self.generate_token(user)
        link = "http://localhost:8080/#/verification/"+token

        message = Mail(
            from_email='wilalexee03@gmail.com',
            to_emails=user.email,
            # to_emails='arlexcaalr@gmail.com',
            subject=f'Bienvenido {user.first_name} {user.last_name} a CianCoders',
            html_content=render_to_string(
                'emails/email_verification.html',
                {'link': link, 'user': user, 'cambiar': cambiar}
            )

        )
        try:
            sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
            response = sg.send(message)
            print(response.status_code)
            print(response.body)
            print(response.headers)
        except Exception as e:
            print(e)

    def generate_token(self, user):
        """Function to generate the token"""

        exp_date = timezone.now() + timedelta(days=3)
        payload = {
            'user': user.email,
            'exp': int(exp_date.timestamp()),
            'type': 'email_confirmation'
        }
        token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
        return token.decode()

    def perform_create(self, serializer):
        serializer.save()

    def get_success_headers(self, data):
        try:
            return {'Location': str(data[api_settings.URL_FIELD_NAME])}
        except (TypeError, KeyError):
            return {}

    @action(methods=["put"], detail=False)
    def update_me(self, request, *args, **kwargs):
        data = request.data
        try:
            avatar = data.get("avatar")
            data = json.loads(data["data"])
            print("Hola desde put: "+data)
            user = request.user
            if user.email != data["email"]:
                try:
                    User.objects.get(email=data["email"])
                    return Response(
                        {"detail": "the chosen email in not available, please pick another"},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                except User.DoesNotExist:
                    pass
            user.email = data["email"]
            user.first_name = data["first_name"]
            user.last_name = data["last_name"]
            perfil, created = Profile.objects.get_or_create(user=user)
            if avatar is not None:
                perfil.avatar = File(avatar)
            profile = data.get("profile")
            if profile is not None:
                perfil.phone = profile.get("phone", perfil.phone)
                perfil.address = profile.get("address", perfil.address)
                perfil.gender = profile.get("gender", perfil.gender)
            user.save()
            perfil.save()
            serializer = UserReadSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["get"], detail=False)
    def me(self, request, *args, **kwargs):
        user = request.user
        serializer = UserReadSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=["post"], detail=False)
    def token(self, request, *args, **kwargs):
        data = request.data
        try:
            user = User.objects.get(email=data["email"])
            if user.check_password(data["password"]):
                token, created = Token.objects.get_or_create(user=user)
                serializer = UserReadSerializer(user)
                return Response({"user": serializer.data, "token": token.key}, status=status.HTTP_200_OK)
            return Response({"detail": "Password does not match user password"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["post"], detail=False)
    def logout(self, request, *args, **kwargs):
        try:
            token = Token.objects.get(user=request.user)
            token.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Token.DoesNotExist:
            return Response({"detail": "session not found"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'])
    def verification(self, request):
        """handle the request of email verification"""
        serializer = UserAccountVerificationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        data = {
            "message": "Congratulations your account is verified, please login"
        }
        return Response(data=data, status=status.HTTP_200_OK)

    @action(methods=["post"], detail=False)
    def reset_pass(self, request, *args, **kwargs):
        data = request.data
        try:
            user = User.objects.get(email=data["email"])
            if user.check_password(data["passwordActual"]):
                user.set_password(request.data["password"])
                user.save()

                return Response({"detail": "Felicidades has cambiado la contraseña"}, status=status.HTTP_200_OK)
            return Response({"detail": "Password does not match user password"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)


    @action(methods=["get"], detail=False)
    def userScrum(self, request, *args, **kwargs):
        usuarios_scrum = User.objects.filter(
                                activo=True,
                                idRoles__nombre__icontains='Scrum master'
                            ).values('id','first_name', 'last_name')
        return Response({'results': usuarios_scrum}, status=status.HTTP_200_OK)

