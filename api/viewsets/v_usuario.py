from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from rest_framework import status, filters, viewsets
from django.db.models import Q
from api.serializers.s_ticketPropiedades import (
    UsuarioModelSerializer
)

from api.models.m_users import User
from rest_framework.pagination import PageNumberPagination

class AgenteViewSet(viewsets.ModelViewSet):
    filter_backends = (DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("first_name", "last_name", )
    search_fields = ("first_name", "last_name",)
    ordering_fields = ("first_name", "last_name",)
    queryset = User.objects.filter(idRoles__nombre__icontains="Agente")
    # queryset = User.objects.all()

    serializer_class = UsuarioModelSerializer


class ClienteViewSet(viewsets.ModelViewSet):
    filter_backends = (DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("first_name", "last_name", )
    search_fields = ("first_name", "last_name",)
    ordering_fields = ("first_name", "last_name",)
    queryset = User.objects.filter(idRoles__nombre__icontains="Cliente")
    serializer_class = UsuarioModelSerializer


class ProgramadorViewSet(viewsets.ModelViewSet):
    filter_backends = (DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("first_name", "last_name", )
    search_fields = ("first_name", "last_name",)
    ordering_fields = ("first_name", "last_name",)
    queryset = User.objects.filter(idRoles__nombre__icontains="Programador")
    serializer_class = UsuarioModelSerializer

class ExamplePagination(PageNumberPagination):       
    page_size = 100

class ProgramadorDiseñadorViewSet(viewsets.ModelViewSet):
    filter_backends = (DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("first_name", "last_name", )
    search_fields = ("first_name", "last_name",)
    ordering_fields = ("first_name", "last_name",)
    pagination_class = ExamplePagination
    queryset = User.objects.filter(Q(idRoles__nombre__icontains="Programador") | Q(idRoles__nombre__icontains="Diseñador"))[:100]
    serializer_class = UsuarioModelSerializer


# class TipoViewSet(viewsets.ModelViewSet):
#     filter_backends = (DjangoFilterBackend,
#                        filters.SearchFilter, filters.OrderingFilter)
#     filter_fields = ("first_name", )
#     search_fields = ("first_name",)
#     ordering_fields = ("first_name", )
#     queryset = Tipos.objects.all()
#     serializer_class = TiposModelSerializer
