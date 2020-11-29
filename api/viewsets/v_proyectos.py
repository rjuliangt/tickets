import json
from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from rest_framework import status, filters, viewsets
from api.models import Proyecto, Empresa, User
from api.serializers import ProyectosModelSerializer, UserSerializerProyectos, serializadorProyectos

from django.db import transaction
from copy import deepcopy


class ProyectoViewset(viewsets.ModelViewSet):
    queryset = Proyecto.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre", )
    search_fields = ("nombre",)
    ordering_fields = ("nombre", )

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return ProyectosModelSerializer
        else:
            return ProyectosModelSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        if self.action == "create" or self.action == "token":
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):
        try:
            with transaction.atomic():
                data = request.data
                serializer = ProyectosModelSerializer(data=request.data)
                if(serializer.is_valid()):
                    empresa = None

                    if(data.get('idEmpresa').get('__isNew__')):
                        empresa = Empresa.objects.create(
                            nombre=data.get('idEmpresa').get('label')
                        )
                    else:
                        idEmpresa = data.get('idEmpresa').get('value')
                        empresa = Empresa.objects.get(pk=idEmpresa)

                    proyecto = Proyecto.objects.create(
                        idEmpresa=empresa,
                        nombre=data.get('nombre'),
                    )

                    proyectoCompleto = ProyectosModelSerializer(proyecto)
                    # RegistroBitacora.crearEmpresa(request.user, serializer.data)
                    return Response(proyectoCompleto.data, status=status.HTTP_201_CREATED)
                else:
                    Response(serializer.errors,
                             status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["get"], detail=False)
    def proyectosClientes(self, request, *args, **kwargs):
        # id = request.GET["id"
        cliente = request.user
        asignaciones = cliente.asignacion_usuarios.all()
        lista = []
        for asignacion in asignaciones:
            lista.append({
                "id": asignacion.idProyecto.id,
                "nombre": asignacion.idProyecto.nombre,
            })

        return Response({"results": lista},
                        status=status.HTTP_200_OK)

    @action(methods=["post"], detail=False)
    def proyectosCliente(self, request, *args, **kwargs):
        # id = request.GET["id"]
        idCliente = request.data
        id = idCliente.get("id")
        # print("peticion", id)
        cliente = User.objects.get(pk=id)
        # print("clienteObvtenido", cliente)
        asignaciones = cliente.asignacion_usuarios.all()
        lista = []
        for asignacion in asignaciones:
            lista.append({
                "id": asignacion.idProyecto.id,
                "nombre": asignacion.idProyecto.nombre,
            })

        return Response({"results": lista},
                        status=status.HTTP_200_OK)

    # def update(self, request, *args, **kwargs):
    #     try:
    #         instancia = self.get_object()
    #         anterior = deepcopy(instancia)
    #         json_anterior = ProyectosModelSerializer(anterior)

    #         #print("instancia: ", instancia.__dict__)
    #         data = request.data
    #         serializer = ProyectosModelSerializer(data=request.data)
    #         if(serializer.is_valid()):
    #             instancia.nombre = data.get('nombre')

    #             instancia.save()

    #             # RegistroBitacora.crearEmpresa(request.user, serializer.data, json_anterior.data)
    #             return Response(serializer.data, status=status.HTTP_201_CREATED)
    #         else:
    #             Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #     except Exception as e:
    #         return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
