from rest_framework.response import Response
import json
from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from rest_framework import status, filters, viewsets
from api.serializers import TicketSerializer, TicketRegistroSerializer, TicketLecturaSerializer, ArchivosSerializer
from api.models import Tickets, Imagenes,  Categorias, Proyecto, User, Archivos
from api.models.m_ticketPropiedades import Prioridades, Etiquetas, Tipos, Estados
from django.db.models import Q, Count
# from api.utils.permissions import permissionAdmin
from django.db import transaction
from datetime import datetime, date, time, timedelta
from django.utils.dateparse import parse_duration


class TicketsViewSet(viewsets.ModelViewSet):

    filter_backends = (DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("idTipo",
                     "idEstado",
                     "idPrioridad",
                     "idGrupo",
                     "idEtiquetas",
                     "idUsuarioCliente",
                     "idUsuarioAsignado",
                     "idUsuarioResuelto",
                     "aprobado",
                     "idProyecto",
                     )

    search_fields = ("asunto",)
    ordering_fields = ("creado", )

    queryset = Tickets.objects.filter(activo=True).order_by("-creado")
    serializer_class = TicketSerializer

    def get_queryset(self):
        if self.request.user.idRoles and self.request.user.idRoles.nombre == 'Cliente' and self.action == 'list':
            return Tickets.objects.filter(activo=True, idUsuarioCliente__pk=self.request.user.id).order_by("-creado")
        else:
            return Tickets.objects.filter(activo=True).order_by("-creado")

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return TicketSerializer
        else:
            return TicketRegistroSerializer
    

    def create(self, request, *args, **kwargs):
        try:
            with transaction.atomic():
                imagenes = []
                archivos = []
                data = request.data
                
                form_data = json.loads(data["data"])
                print("ticket {} ".format(request.data.items()))
                print("ticket request {}".format(request.data))
                print("ticket request acciones {}".format(dir(request.data)))
                if(form_data.get('idUsuarioCliente') is not None):
                    Usuario = int(form_data.get('idUsuarioCliente'))
                else:
                    Usuario = request.user.id
                id_tipo = None
                id_estado = None
                prioridad = None
                grupo = None
                proyecto = None
                idAsignado = None
                aprobado = False
                if (form_data.get('idTipo')):
                    tipo = int(form_data.get('idTipo'))
                    id_tipo = Tipos.objects.get(pk=tipo)
                if (form_data.get('idEstado')):
                    estado = int(form_data.get('idEstado'))
                    id_estado = Estados.objects.get(pk=estado)
                if (form_data.get('idPrioridad')):
                    id_prioridad = int(form_data.get('idPrioridad'))
                    prioridad = Prioridades.objects.get(pk=id_prioridad)
                if (form_data.get('idGrupo')):
                    id_grupo = int(form_data.get('idGrupo'))
                    grupo = Categorias.objects.get(pk=id_grupo)
                if (form_data.get('idProyecto')):
                    id_proyecto = int(form_data.get('idProyecto'))
                    proyecto = Proyecto.objects.get(pk=id_proyecto)
                if (form_data.get('idUsuarioAsignado')):
                    id_asignado = int(form_data.get('idUsuarioAsignado'))
                    idAsignado = User.objects.get(pk=id_asignado)
                if (form_data.get('aprobado')):
                    aprobado = form_data.get('aprobado')
                tickets = Tickets.objects.get_or_create(
                    idUsuarioCliente=User.objects.get(
                        pk=Usuario),
                    asunto=form_data.get('asunto'),
                    descripcion=form_data.get('descripcion'),
                    aprobado=aprobado,
                    idTipo=id_tipo,
                    idEstado=id_estado,
                    idPrioridad=prioridad,
                    idGrupo=grupo,
                    idProyecto=proyecto,
                    idUsuarioAsignado=idAsignado
               )

                listado_etiqueta = form_data.get('idEtiquetas',[])
                for etiqueta in listado_etiqueta:
                    tickets.idEtiquetas.add(etiqueta) 

                # seccion para guaradar imagenes
                for key, value in data.items():
                    if str(type(value)) == "<class 'django.core.files.uploadedfile.InMemoryUploadedFile'>" and not 'archivo' in str(key):
                        imagenes.append(value)

                for imagen in imagenes:
                    Imagenes.objects.create(
                    ticket=tickets,
                    imagen=File(imagen)
                )

                # seccion para guaradar archivos
                for key, value in data.items():
                    print(key)
                    print(type(key))
                    if str(type(value)) == "<class 'django.core.files.uploadedfile.InMemoryUploadedFile'>" and 'archivo' in str(key):
                        archivos.append(value)


                for archivo in archivos:
                    Archivos.objects.get_or_create(
                    ticket=tickets,
                    archivo=File(archivo)
                )
                
                serializer = TicketSerializer(tickets)
                return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detalle': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        try:
            with transaction.atomic():
                data = request.data
                print('********************')
                print('data {}'.format(data))
                form_data = json.loads(data["data"])
                instancia = Tickets.objects.get(pk=pk)
                fecha_actual = datetime.now()

                if(form_data.get('idUsuarioCliente') is not None):
                    Usuario = int(form_data.get('idUsuarioCliente'))
                else:
                    Usuario = request.user.id

                id_tipo = None
                id_estado = None
                prioridad = None
                grupo = None
                proyecto = None
                idAsignado = None
                aprobado = False

                if (form_data.get('idTipo')):
                    tipo = int(form_data.get('idTipo'))
                    id_tipo = Tipos.objects.get(pk=tipo)
                if (form_data.get('idEstado')):
                    estado = int(form_data.get('idEstado'))
                    id_estado = Estados.objects.get(pk=estado)
                if (form_data.get('idPrioridad')):
                    id_prioridad = int(form_data.get('idPrioridad'))
                    prioridad = Prioridades.objects.get(pk=id_prioridad)
                if (form_data.get('idGrupo')):
                    id_grupo = int(form_data.get('idGrupo'))
                    grupo = Categorias.objects.get(pk=id_grupo)
                if (form_data.get('idProyecto')):
                    id_proyecto = int(form_data.get('idProyecto'))
                    proyecto = Proyecto.objects.get(pk=id_proyecto)
                if (form_data.get('aprobado')):
                    aprobado = form_data.get('aprobado')
                if (form_data.get('idUsuarioAsignado')):
                    id_asignado = int(form_data.get('idUsuarioAsignado'))
                    idAsignado = User.objects.get(pk=id_asignado)
                    print(f'esatdo: {id_estado}')
                    if (id_estado and id_estado.nombre == 'Abierto'):
                        instancia.fechaInicio = fecha_actual
                        if(instancia.idEstado and instancia.idEstado.nombre == 'Cerrado'):
                            instancia.fechafin == None
                    if (id_estado and id_estado.nombre == 'Resuelto'):
                        instancia.fechafin = fecha_actual
                    if (id_estado and id_estado.nombre == 'Cerrado'):
                        instancia.fechafin = fecha_actual
                        print(f'resultado_fecha fin: {instancia.fechafin}')
                        resultado_fecha = self.calculoHorasTrabajadas(instancia.fechaInicio, instancia.fechafin)
                        print(f'horas resultado_fecha: {resultado_fecha}')
                        instancia.horasTrabajadas = resultado_fecha
                        
                instancia.idUsuarioCliente = User.objects.get(pk=Usuario)
                instancia.asunto = form_data.get('asunto')
                instancia.descripcion = form_data.get('descripcion')
                instancia.aprobado = aprobado
                instancia.idTipo = id_tipo
                if(id_estado and instancia.idEstado):
                    if (instancia.idEstado.nombre == 'Cerrado' and id_estado.nombre == 'Abierto'):
                        instancia.reabierto += 1

                instancia.idEstado = id_estado
                instancia.idPrioridad = prioridad
                instancia.idGrupo = grupo
                instancia.idProyecto = proyecto
                instancia.idUsuarioAsignado = idAsignado

                listado_etiqueta = form_data.get('idEtiquetas')
                etiquetas_actual = list(instancia.idEtiquetas.all().values_list('id', flat=True))

                # seccion de las_etiquetas
                for etiqueta in etiquetas_actual:
                    instancia.idEtiquetas.remove(etiqueta)
                for etiqueta in listado_etiqueta:
                    instancia.idEtiquetas.add(etiqueta) 
                
                # secion para actualizar imagenes
                imagenes = []
                imagenes_existentes = Imagenes.objects.filter(activo=True,ticket=instancia.pk)

                for imagen_ixistente in imagenes_existentes:
                    imagen_ixistente.activo = False
                    imagen_ixistente.save()

                for key, value in data.items():
                    if str(type(value)) == "<class 'django.core.files.uploadedfile.InMemoryUploadedFile'>" and not 'archivo' in key:
                        imagenes.append(value)

                for imagen in imagenes:
                    Imagenes.objects.create(
                    ticket=instancia,
                    imagen=File(imagen)
                )

                # secion para actualizar archivos
                archivos = []
                archivos_existentes = Archivos.objects.filter(activo=True,ticket=instancia.pk)

                for archivo_ixistente in archivos_existentes:
                    archivo_ixistente.activo = False
                    archivo_ixistente.save()

                for key, value in data.items():
                    print('las llaves son {}'.format(key))
                    if str(type(value)) == "<class 'django.core.files.uploadedfile.InMemoryUploadedFile'>" and 'archivo' in str(key):
                        archivos.append(value)

                for archivo in archivos:
                    Archivos.objects.get_or_create(
                    ticket=instancia,
                    archivo=File(archivo)
                )

                instancia.save()
                serializer = TicketSerializer(instancia)

                return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detalle': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    # @action(methods=["get"], detail=False)
    # def ticketProgramador(self, request, *args, **kwargs):
    #     data = request.data
    #     cliente = request.user
    #     asignaciones = cliente.asignacion_usuarios.all()
        

    #     proyectos = []
    #     for asignacion in asignaciones:
    #         proyectos.append(
    #             asignacion.idProyecto
    #         )
    #     queryset = Tickets.objects.filter(idProyecto__in=proyectos)
    #     serializer = TicketSerializer(queryset, many=True)
    #     return Response({"results": serializer.data}, status=status.HTTP_200_OK)

    @action(methods=["get"], detail=False)
    def ticketCliente(self, request, *args, **kwargs):
        data = request.data
        cliente = request.user.idRoles.nombre
        print('Rol:', cliente.idRoles.nombre)
        print(dir(cliente))
        tickets_cliente = Tickets.objects.filter(activo=True, idUsuarioCliente=cliente.id)
        
        tickets_list = []
        # for ticket in tickets_cliente:
        #     tickets_list.append(
        #         ticket.idProyecto
        #     )
        #queryset = Tickets.objects.filter(idProyecto__in=proyectos)
        serializer = TicketSerializer(tickets_cliente, many=True)
        return Response({"results": serializer.data}, status=status.HTTP_200_OK)

    @action(methods=["put"], detail=False)
    def deleteTickets(self, request, *args, **kwargs):
        data = request.data
        try:
            print(data)
            with transaction.atomic():
                if len(data):
                    for ticke in data:
                        pk_ticket = ticke.get('value')
                        instancia_ticket = Tickets.objects.get(pk=pk_ticket)
                        instancia_ticket.activo = False
                        instancia_ticket.save()
            return Response({"detail": 'Registro eliminado'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(methods=["get"], detail=False)
    def resumenEstados(self, request):
        try:
            ticketsResueltos=(Tickets.objects
                                .filter(activo=True)
                                .filter(Q(idEstado__nombre__icontains="Resuelto")|Q(idEstado__nombre__icontains="Cerrado"))
                                .count())
            ticketsNoResueltos=(Tickets.objects
                                    .filter(activo=True)
                                    .filter(~Q(idEstado__nombre__icontains="Cerrado"),~Q(idEstado__nombre__icontains="Resuelto"))
                                    .count())
            # total_Estado = {}
            estados = Estados.objects.filter(activo=True)
            listado_estados = []
            for estado in estados:
                estado_acumulado = 0
                resumen = Tickets.objects.filter(
                    activo=True,
                    idEstado=estado,
                ).aggregate(
                    total=Count('idEstado__id')
                )
                if (resumen):
                    estado_acumulado += resumen['total']
                    estado_registro = {
                        'etiqueta': estado.nombre,
                        'valor': estado_acumulado,
                        'color': estado.color
                    }
                    listado_estados.append(estado_registro)

            total = {'cerrados': ticketsResueltos, 'nocerrados': ticketsNoResueltos, 'estados': listado_estados}
            return Response({"Results": total}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detalle': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["get"], detail=False)
    def resumenPrioridad(self, request):
        try:
            data_prioridad = Prioridades.objects.filter(activo=True)
            listado_prioridad = []
            total_tickets = Tickets.objects.filter(activo=True).count()
            for prioridad in data_prioridad:
                prioridad_acumulado = 0
                resumen = Tickets.objects.filter(
                    activo=True,
                    idPrioridad=prioridad,
                ).aggregate(
                    total=Count('idPrioridad__id')
                )
                if (resumen):
                    prioridad_acumulado += resumen['total']
                    prioridad_registro = {
                        'etiqueta': prioridad.nombre,
                        'valor': prioridad_acumulado,
                        'color': prioridad.color
                    }
                    listado_prioridad.append(prioridad_registro)

            total = {'prioridad': listado_prioridad, 'total_tickets': total_tickets}
            return Response({"Results": total}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)


    @action(methods=['get'], detail=False)
    def conteoTicket(self, request):
        try:
            total_tickets = Tickets.objects.filter(activo=True).count()
            return Response({"Results": total_tickets}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)


    @action(methods=['get'], detail=False)
    def getDocumentos(self, request):
        try:
            data = request.query_params
            id_ticket = int(data.get('idTicketDoc'))
            documentos_ticket = Archivos.objects.filter(ticket=id_ticket)
            print(f'los docs: {documentos_ticket}')
            
            serializer = ArchivosSerializer(documentos_ticket, many=True)
            # serializer_rol = ArchivosSerializer(permiso_rol)
            datos = {
                    'documentos' : serializer.data
                }
            # print(datos)
            return Response(datos, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def calculoHorasTrabajadas(self, fechaInicio, fechafin):
        inicio_hora_matutina = datetime.strptime('08:00:00', '%H:%M:%S').time()
        inicio_hora_vespertina = datetime.strptime('14:00:00', '%H:%M:%S').time()
        fin_hora_matutina = datetime.strptime('13:00:00', '%H:%M:%S').time()
        fin_hora_vespertina = datetime.strptime('18:00:00', '%H:%M:%S').time()
        diff = (fechafin.date() - fechaInicio.date()).days
        
        fecha_respuesta= timedelta(hours=0, minutes=0, seconds=0)
        # print(f'los dias son: {diff}')
        try:
            if (diff > 0):
                if (fechaInicio.time() >= inicio_hora_matutina and fechaInicio.time() <= fin_hora_matutina):
                    horas_primer_dia = (fin_hora_matutina.hour - fechaInicio.time().hour) + (
                        fin_hora_vespertina.hour - inicio_hora_vespertina.hour)
                    fecha_respuesta += timedelta(hours=int(horas_primer_dia))

                elif(fechaInicio.time() >= inicio_hora_vespertina and fechaInicio.time() <= fin_hora_vespertina):
                    horas_primer_dia = (fin_hora_vespertina.hour - fechaInicio.time().hour)
                    horas_primer_dia -= 1 

                horas_de_dias = (diff * ((fin_hora_matutina.hour - inicio_hora_matutina.hour ) + (fin_hora_vespertina.hour - inicio_hora_vespertina.hour )))
                fecha_respuesta = timedelta(hours=int(horas_de_dias + horas_primer_dia))

                if (fechaInicio.time().minute > 0):
                    fecha_respuesta += timedelta(minutes=int(
                        (60 - fechaInicio.time().minute) - (60 - fechafin.time().minute)))

                if (fechaInicio.time().second > 0):
                    fecha_respuesta += timedelta(seconds=int(60 - fechaInicio.time().second))

            elif (diff == 0):
                if (fechafin.time() >= inicio_hora_matutina and fechafin.time() <= fin_hora_matutina):
                    if (fechaInicio.time() >= inicio_hora_matutina and fechaInicio.time() <= fin_hora_matutina):
                        horas_dia = (fechafin.time().hour - fechaInicio.time().hour)
                        fecha_respuesta += timedelta(hours=horas_dia)
                    if (fechaInicio.time() >= inicio_hora_vespertina and fechaInicio.time() <= fin_hora_vespertina):
                        horas_tarde = (fin_hora_vespertina.hour - fechaInicio.time().hour)
                        horas_maniana = (fechafin.time().hour - inicio_hora_matutina.hour)
                        fecha_respuesta += timedelta(hour=(horas_tarde + horas_maniana))

                    if (fechaInicio.time().minute >= 0):
                        fecha_respuesta += timedelta(minutes=int((60 - fechaInicio.time().minute) - (60 - fechafin.time().minute)))
                        # print(f'minutos: {fecha_respuesta}')
                    if (fechaInicio.time().second >= 0):
                        fecha_respuesta += timedelta(seconds=int(60 - fechaInicio.time().second))

                elif (fechafin.time() >= inicio_hora_vespertina and fechafin.time() <= fin_hora_vespertina):
                    if(fechaInicio.time() >= inicio_hora_matutina and fechaInicio.time() <= fin_hora_matutina):
                        horas_dia = (fechafin.time().hour - inicio_hora_vespertina.hour) + \
                            (fin_hora_matutina.hour - fechaInicio.time().hour)
                        fecha_respuesta += timedelta(hours=horas_dia)

                    if(fechaInicio.time() >= inicio_hora_vespertina and fechaInicio.time() <= fin_hora_vespertina):
                        horas_dia = (fechafin.time().hour - fechafin.time().hour) 
                        fecha_respuesta += timedelta(hours=horas_dia)

                    if (fechaInicio.time().minute > 0):
                        fecha_respuesta += timedelta(minutes=int((60 - fechaInicio.time().minute) - (60 - fechafin.time().minute)))

                    if (fechaInicio.time().second > 0):
                        fecha_respuesta += timedelta(seconds=int(60 - fechaInicio.time().second))
                    #  commit - cambio de tipo de campo, timeField consulta de horas trabajadas
            tiempo = (datetime.min + fecha_respuesta).time()
            print(type(tiempo))
            print(tiempo)
            return tiempo
        except Exception as e:
            print(e)
        
        
