from rest_framework.decorators import action
from rest_framework import status, viewsets, filters
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from api.models.m_permiso import Permiso
from api.serializers.s_permiso import PermisoSerializer, PermisoCreateSerializer, PermisoReadSerializer

class PermisoViewSet(viewsets.ModelViewSet):
    queryset = Permiso.objects.filter(activo=True)

    serializer_class = PermisoSerializer

    filter_backends = (DjangoFilterBackend,
                    filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ('id',"nombre",)

    search_fields = ('id',"nombre",)
    ordering_fields = ('id',"nombre",)