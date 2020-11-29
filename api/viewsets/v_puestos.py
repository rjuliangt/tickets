from rest_framework.decorators import action
from rest_framework import status, viewsets, filters
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from api.models.m_puestos import Puestos
from api.serializers.s_puestos import PuestoSerializer, PuestoCreateSerializer, PuestoReadSerializer

class PuestosViewSet(viewsets.ModelViewSet):
    queryset = Puestos.objects.filter(activo=True)

    serializer_class = PuestoSerializer

    filter_backends = (DjangoFilterBackend,
                    filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ('id',"nombre",)

    search_fields = ('id',"nombre",)
    ordering_fields = ('id',"nombre",)

    def create(self, request, *args, **kwargs):
        # print('entro a al opcion de crear')
        data = request.data
        serializer = PuestoCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        if (data.get('nombre')):
            puesto = Puestos.objects.create(nombre=data.get('nombre').capitalize())
            serializer = PuestoReadSerializer(puesto)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
