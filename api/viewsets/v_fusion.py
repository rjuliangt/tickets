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
from api.models import Tickets, Fusion
from api.serializers import FusionModelSerializer

from django.db import transaction
from copy import deepcopy


class FusionViewset(viewsets.ModelViewSet):
    queryset = Fusion.objects.all()

    # filter_backends = (DjangoFilterBackend,
    #                    filters.SearchFilter, filters.OrderingFilter)
    # filter_fields = ("nombre", )
    # search_fields = ("nombre",)
    # ordering_fields = ("nombre", )

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return FusionModelSerializer
        else:
            return FusionModelSerializer

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
                datos = request.data
                tickets = datos.get("tickets")
                Principal = int(datos.get("principal"))

                # print(Principal)
                # serializer = FusionsModelSerializer(data=datos)
                if (Principal != None):
                    # print('entro al serializer 54--')
                    ticket_principal = Tickets.objects.get(pk=Principal)
                    for ticket in tickets:
                        idTicket = int(ticket.get("value"))
                        ticket_sec = Tickets.objects.get(pk=idTicket)
                        # validacion de campos principales para poder fusionar
                        if (ticket_principal.idGrupo == ticket_sec.idGrupo and ticket_principal.idProyecto == ticket_sec.idProyecto and ticket_principal.idUsuarioCliente == ticket_sec.idUsuarioCliente):
                            # print(Principal)
                            # print(idTicket)
                            if (Principal == idTicket):
                                # print("Desde backend principal")
                                ticket_principal.EstadoPrincipal = True
                                ticket_principal.estadoFusion = True
                                ticket_principal.save()
                                # print(ticket.get("value"))
                            else:
                                # print("Desde backend segundo")
                                fusion = Fusion.objects.create(idTicketPrincipal=Tickets.objects.get(pk=Principal), idTicketFusion=Tickets.objects.get(pk=idTicket))
                                # Tickets.objects.filter(pk=idTicket).update(estadoFusion=True)
                                ticket_sec.estadoFusion = True
                                ticket_sec.activo = False
                                ticket_sec.save()
                else:
                    return Response({'detail': 'Fusion fallida'}, status=status.HTTP_400_BAD_REQUEST)
                
                return Response({'detail': 'Funcion realizada correctamente'}, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
