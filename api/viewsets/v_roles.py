from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from rest_framework import status, filters, viewsets
from rest_framework.response import Response

from api.serializers.s_roles import CreateModelSerializer, RolesModelSerializer
from api.serializers.s_permiso import PermisoReadSerializer
from api.models.m_roles import Roles
from api.models.m_permiso import Permiso
from django.db.models import Case, When, Value, BooleanField, Q

from rest_framework.permissions import(
    AllowAny,
    IsAuthenticated
)


class RolesViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Roles.objects.all()

    serializer_class = RolesModelSerializer

    filter_backends = (DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre", )
    search_fields = ("nombre",)
    ordering_fields = ("nombre", )

    def create(self, request, *args, **kwargs):
        data = request.data
        all_permisos = Permiso.objects.filter(activo=True).values('id','nombre')
        serializer = CreateModelSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        if (data.get('nombre')):
            rol = Roles.objects.create(nombre=data.get('nombre').capitalize())
            for permiso in all_permisos:
                if (data.get(permiso['nombre']) == True):
                    rol.permisos.add(permiso["id"])
            serializer = RolesModelSerializer(rol)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


    def update(self, request, *args, **kwargs):
        try:
            data = request.data

            print(f'data del rol: {data}')
            id_rol = int(data.get('id'))
            all_permisos = Permiso.objects.filter(activo=True).values('id','nombre')
            permiso_rol = Roles.objects.get(pk=id_rol)
            permisos_asignados = list(permiso_rol.permisos.all().values_list('id', flat=True))

            for permiso_actual in permisos_asignados:
                permiso_rol.permisos.remove(permiso_actual)
            if (data.get('nombre')):
                permiso_rol.nombre = data.get('nombre').capitalize()
                for permiso in all_permisos:
                    if (data.get(permiso['nombre']) == True):
                        permiso_rol.permisos.add(permiso["id"])
                permiso_rol.save()
                serializer = RolesModelSerializer(permiso_rol)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            #     all_data = permiso_rol.permisos.get_or_create(permiso_asigando)
        except Exception as e:
            return Response({'detalle': str(e)}, status=status.HTTP_400_BAD_REQUEST)


    @action(methods=['get'], detail=False)
    def getPermisos(self, request):

        data = request.query_params
        id_rol = int(data.get('rol'))
        permiso_rol = Roles.objects.get(pk=id_rol)
        # print(f'el rol: {permiso_rol}')
        roles_asignados = permiso_rol.permisos.all().values_list('id', flat=True)
        lista_roles_asignados = list(roles_asignados)
        # print('Permisos asignados {}'.format(list(roles_asignados)))
        if not lista_roles_asignados:
            lista_roles_asignados.append(0)

        permisos = Permiso.objects.filter(activo=True).annotate(
                                                            asignado=Case(
                                                                    When(Q(
                                                                    id__in=lista_roles_asignados),
                                                                    then=Value(True)),
                                                                    When(~Q(
                                                                    id__in=lista_roles_asignados),
                                                                    then=Value(False)),
                                                                    deafult=Value(False),
                                                                    output_field=BooleanField(default=False)
                                                                )              
                                                            )
        
        serializer = PermisoReadSerializer(permisos, many=True)
        serializer_rol = RolesModelSerializer(permiso_rol)
        datos = {
                'rol': serializer_rol.data,
                'permisos' : serializer.data
            }
        # print(datos)
        return Response(datos, status=status.HTTP_200_OK)