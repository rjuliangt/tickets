from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from rest_framework import status, filters, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from api.serializers import CategoriaSerializer,CategoriaRegistroSerializer
from api.models.m_categorias import Categorias
# from api.utils.permissions import permissionAdmin


class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categorias.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre", )
    search_fields = ("nombre",)
    ordering_fields = ("nombre", )

    def get_serializer_class(self):
         """Define serializer for API"""
         if self.action == 'list' or self.action == 'retrieve':
             return CategoriaSerializer
         else:
             return CategoriaRegistroSerializer

    # queryset = Categorias.objects.all()
    # serializer_class = CategoriaRegistroSerializer
    
    # def get_permissions(self):
    #     """" Define permisos para este recurso """
    #     if self.action in ['create','update','list','delete','partial_update']:
    #         permissions = [permissionAdmin]
    #     return [p() for p in permissions]
    def get_permissions(self):
        """" Define permisos para este recurso """
        if self.action == ['create', 'update', 'list', 'delete', 'partial_update'] or self.action == "token":
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    # @action(detail=True, methods=['post'])    
