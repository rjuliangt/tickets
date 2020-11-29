from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from rest_framework import status, filters, viewsets
import json

from api.serializers.s_comentarios import ComentariosCrearModelSerializer, ComentariosLeerModelSerializer, ComentarioActualizarModelSerializer
from api.models.m_comentarios import Comentarios
from api.models.m_imagenes import Imagenes
from api.models.m_tickets import Tickets
from api.models.m_ticketPropiedades import Estados
from django.core.files import File

from rest_framework.response import Response
from django.db import transaction
from copy import deepcopy
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from django.template.loader import render_to_string
from django.conf import settings


class ComentarioViewSet(viewsets.ModelViewSet):
    filter_backends = (DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("idTicket__id", )
    # search_fields = ("nombre",)
    # ordering_fields = ("creado", )
    # queryset = Tickets.objects.all().order_by("-creado")

    # print("aca estoy")
    queryset = Comentarios.objects.all().order_by("actualizado")

    def get_serializer_class(self):
        if self.action == 'list' or self.action == 'retrieve':
            return ComentariosLeerModelSerializer
        elif self.action == 'update':
            return ComentarioActualizarModelSerializer
        else:
            return ComentariosCrearModelSerializer

    @action(methods=["get"], detail=False)
    def listarComentarios(self, request, *args, **kwargs):
        data = request.query_params
        queryset = Comentarios.objects.all().order_by("actualizado")
        # print("estos son datos", data)
        if(data.get('idTicket__id')):
            queryset = queryset.filter(idTicket__id=data.get('idTicket__id'))

        serializer = ComentariosLeerModelSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        try:
            with transaction.atomic():
                data = deepcopy(request.data)
                data["idAutor"] = request.user.id
                form_data = json.loads(data["data"])
                data["contenido"] = form_data.get('contenido')
                data["comentario"] = form_data.get('comentario')
                data["idTicket"] = form_data.get('idTicket')
                
                print("comentario ticket {}".format(data.get('idTicket')))
                print("comentario request form{}".format(data))
                # print("comentario request 3 {}".format(data))
                imagenes = []
                serializer = self.get_serializer(data=data)
                serializer.is_valid(raise_exception=True)
                self.perform_create(serializer)
                ticket = Tickets.objects.get(pk=data["idTicket"])

                for key, value in data.items():
                    if str(type(value)) == "<class 'django.core.files.uploadedfile.InMemoryUploadedFile'>" and not 'archivo' in str(key):
                        imagenes.append(value)

                for imagen in imagenes:
                    Imagenes.objects.create(
                    ticket=ticket,
                    imagen=File(imagen)
                )
                if(serializer.data.get('comentario')):
                    estado = ticket.idEstado
                    if (estado and estado.nombre == 'Cerrado'):
                        estado_abierto = Estados.objects.get(nombre='Abierto')
                        ticket.reabierto += 1
                        ticket.idEstado = estado_abierto
                        ticket.save()
                    self.sending_emial(serializer.data.get(
                        'contenido'), ticket.idUsuarioCliente)  # Activar para poder enviar email
                else:
                    print(" serializer no enviar email")
                headers = self.get_success_headers(serializer.data)
                return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        except Exception as e:
            return Response({'detalle': str(e)}, status=status.HTTP_400_BAD_REQUEST)


    def update(self, request, pk=None):
        print("comentario upate", request.data)
        print("comentario user upate", request.user.id)
        print("id upate", pk)
        # request.data["idAutor"] = request.user.id
        data = request.data
        form_data = json.loads(data["data"])
        print('data form_data .get {}'.format(form_data.get("contenido").get('html_content')))
        contenido = form_data.get("contenido").get('html_content')
        imagenes = []
        comentario = Comentarios.objects.get(pk=int(pk))
        comentario.contenido = contenido
        comentario.save()
        print('id ticket: {}'.format(comentario.idTicket.pk))
        ticket = Tickets.objects.get(pk=str(comentario.idTicket.pk))
        for key, value in request.data.items():
            if str(type(value)) == "<class 'django.core.files.uploadedfile.InMemoryUploadedFile'>" and not 'archivo' in str(key):
                imagenes.append(value)

        for imagen in imagenes:
            Imagenes.objects.create(
            ticket=ticket,
            imagen=File(imagen)
        )

        serializer = ComentarioActualizarModelSerializer(data=comentario)
        serializer.is_valid()
        print(serializer)
        if(comentario.comentario):
            self.sending_emial(serializer.data.get('contenido'), ticket.idUsuarioCliente)  # Activar para poder enviar email
        return Response({'results': serializer.data}, status=status.HTTP_201_CREATED)


    def sending_emial(self, contenido, cliente):
        """functions that sends the email verification"""

        message = Mail(
            from_email='wilalexee03@gmail.com',
            to_emails=cliente.email,
            # to_emails='arlexcaalr@gmail.com',
            subject=f'Te Respondieron en CianCoders',
            html_content=render_to_string(
                'emails/email_comentario.html',
                {'contenido': contenido, }
            )

        )
        try:
            sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
            response = sg.send(message)
            # print(response.status_code)
            # print(response.body)
            # print(response.headers)
            # print("se envio el mensaje")
        except Exception as e:

            print("noo envio el mensaje")
            print(e)
