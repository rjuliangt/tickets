from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from rest_framework import status, filters, viewsets
from rest_framework.response import Response

from api.models.m_tickets import Tickets
from api.serializers.s_tickets import TicketAprobadoSerializer

from api.serializers.s_ticketPropiedades import (
    TiposModelSerializer,
    EstadosModelSerializer,
    PrioridadesModelSerializer,
    EtiquetasModelSerializer
)

from api.models.m_ticketPropiedades import (
    Tipos,
    Estados,
    Prioridades,
    Etiquetas
)


class EtiquetaViewSet(viewsets.ModelViewSet):
    filter_backends = (DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre", "activo",)
    search_fields = ("nombre",)
    ordering_fields = ("nombre",  "activo",)
    queryset = Etiquetas.objects.all()
    serializer_class = EtiquetasModelSerializer


class PrioridadViewSet(viewsets.ModelViewSet):
    filter_backends = (DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre", "activo",)
    search_fields = ("nombre",)
    ordering_fields = ("nombre",  "activo",)
    queryset = Prioridades.objects.all()
    serializer_class = PrioridadesModelSerializer


class EstadoViewSet(viewsets.ModelViewSet):
    filter_backends = (DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre", "activo",)
    search_fields = ("nombre",)
    ordering_fields = ("nombre",  "activo",)
    queryset = Estados.objects.all()
    serializer_class = EstadosModelSerializer


class TipoViewSet(viewsets.ModelViewSet):
    filter_backends = (DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre", "activo",)
    search_fields = ("nombre",)
    ordering_fields = ("nombre", "activo",)
    queryset = Tipos.objects.all()
    serializer_class = TiposModelSerializer

class TicketAprobado(viewsets.ModelViewSet):
    queryset = Tickets.objects.filter(aprobado=True)
    @action(methods=["get"], detail=False)
    def aprobados(self, request):
        filter_backends = (DjangoFilterBackend,
                        filters.SearchFilter, filters.OrderingFilter)
        #filter_fields = ("aprobado")
        # search_fields = ("aprobado")
        # ordering_fields = ("aprobado")
        
        #serializer_class = TicketAprobadoSerializer

        datos_aprobados=[{ 'id': True, 'nombre': 'Aprobados' },
                        { 'id': False, 'nombre': 'No aprobados' }]

        return Response({"results": datos_aprobados}, status=status.HTTP_200_OK)
