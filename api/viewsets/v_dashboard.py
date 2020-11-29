from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status, filters
from rest_framework.viewsets import GenericViewSet
from django.db.models import Count, Case, When, Sum, Q
from datetime import datetime, timedelta, date, time
from django.utils import timezone

# Importacion de los modelos a usar en el reporte
from api.models import Proyecto, Estados, Prioridades, User, Tickets

# importacion de serializer
from api.serializers import ProyectosResumenSemanalSerializer, ProyectosResueltoSemanalSerializer  

#ceacion de los viewset 
class DashboardViewSet(GenericViewSet):
    queryset = Proyecto.objects.all()

    @action(methods=["get"], detail=False)
    def Dashboard(self, request):
        
        try:
            now = datetime.now()
            # ticketsResueltos=Tickets.objects.filter(activo=True).filter(idEstado__nombre="Resuelto").count()
            # ticketsAbiertos=Tickets.objects.filter(activo=True).filter( idEstado__nombre='Abierto').count()
            # ticketsPendientes=(Tickets.objects.filter(activo=True)
            #                     .exclude(idEstado__nombre="Cerrado")
            #                     .exclude(idEstado__nombre="Resuelto")
            #                     .filter(aprobado__isnull=True).count())
            # ticketsSprint=Tickets.objects.filter(activo=True).filter(Q(idEstado__nombre="Sprint")).count()
            # ticketsCerrados=Tickets.objects.filter(activo=True).filter(Q(idEstado__nombre="Cerrado")).count()
            # ticketsReAbiertos=Tickets.objects.filter(activo=True).filter(reabierto__gt=0).count()
            # #ticketsHoy=Tickets.objects.filter(activo=True).filter(~Q(idEstado__nombre="Reabierto")).count()

            #--------------------Consulta Dashboard------------
            ticketsResueltosHoy=(Tickets.objects
                               .filter(activo=True,fechafin__contains=str(now.date()))
                                .filter(idEstado__nombre="Resuelto").count())

            ticketsAprobados=Tickets.objects.filter(activo=True).filter(aprobado=True).count()

            ticketsReAbiertosHoy=(Tickets.objects
                                .filter(activo=True,creado__contains=str(now.date()))
                                .exclude(idEstado__nombre="Cerrado").count())

            ticketsResueltos=(Tickets.objects
                                        .filter(activo=True)
                                        .filter(idEstado__nombre="Resuelto").count())
            ticketsCerrados=(Tickets.objects
                                        .filter(activo=True)
                                        .filter(idEstado__nombre="Cerrado").count())

            rezagoDeTickets=(Tickets.objects.filter(activo=True)
                                        .filter(aprobado=False)
                                        .filter(idEstado__nombre="Abierto").count())
            
            total_tickets = Tickets.objects.filter(activo=True).count()
                                    
            

            query_estado = Estados.objects.filter(activo=True)
            dato = {}
            for estado in query_estado:
                ticket = Tickets.objects.filter(
                                activo=True,
                                idEstado=estado.pk
                            ).aggregate(total=Count('idEstado__id'))
                dato[estado.nombre]=ticket['total']
            dato['Aprobados']= ticketsAprobados
            dato['Reportados hoy']= ticketsReAbiertosHoy



            total = ({  })
            
            proyectos = Proyecto.objects.filter(activo=True)
            prioridades = Prioridades.objects.filter(activo=True)
            dataPadre = {}
            total_columnaP = {}
            for proyecto in proyectos:
                acumulador = 0
                #lista_prioridades = []
                for prioridad in prioridades:
                    resumen = Tickets.objects.filter(
                                activo=True,
                                idPrioridad=prioridad,
                                idProyecto=proyecto,
                            ).aggregate(
                                    total=Count('idPrioridad__id'),
                                )
                                
                    if (resumen):
                        acumulador += resumen['total']
                        if prioridad.nombre in total_columnaP:
                            total_columnaP[prioridad.nombre] += resumen['total']
                        else:
                            total_columnaP[prioridad.nombre] = resumen['total']
                        
                # registro_SubTotal = {
                #     'etiqueta':'subtotal',
                #     'valor':acumulador
                # }
                # if 'subtotal' in total_columnaP:
                #     total_columnaP['subtotal'] += acumulador
                # else:
                #     total_columnaP['subtotal'] = acumulador
                # lista_prioridades.insert(0, registro_SubTotal )       
        
            dataPadre['conteo_totalp'] = total_columnaP
            total['prioridad']=dataPadre
            total['Dashboard_estados']=dato
            total['resueltos_hoy']=ticketsResueltosHoy
            total['resueltos_cerrados']=ticketsResueltos+ticketsCerrados
            total['rezago_NoAprobados']= rezagoDeTickets
            total['Total_Tickets']= total_tickets
            
            
            
            # print(dataPadre)
            return Response({"Results": total}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["get"], detail=False)
    def DashboardSemanal(self, request):
        try:
            total={}
            current_tz = timezone.get_current_timezone()
            now = datetime.now()

            fecha_inicial = now - timedelta(days=8)
            f_inicial =  fecha_inicial.strftime('%d/%m/%Y')
            
            fecha_final= now + timedelta(days=2)
            f_final =  fecha_final.strftime('%d/%m/%Y')
    
            fecha_inicial_format = datetime.strptime(f_inicial, "%d/%m/%Y")
            fecha_final_format = datetime.strptime(f_final, "%d/%m/%Y")
           
            fecha_inicial_format = current_tz.localize(fecha_inicial_format)
            fecha_final_format = current_tz.localize(fecha_final_format)
            # print(f_inicial)
            # print(f_final)


           
            proyectos = Proyecto.objects.filter(activo=True)
            prioridades = Prioridades.objects.filter(activo=True)
            dataPadre = {}
            total_columnaP = {}
            for proyecto in proyectos:
                acumulador = 0
                #lista_prioridades = []
                for prioridad in prioridades:
                    resumen = Tickets.objects.filter(
                            activo=True,
                            idPrioridad=prioridad,
                            idProyecto=proyecto,
                            actualizado__range=[fecha_inicial_format,fecha_final_format]
                            ).aggregate(
                                total=Count('idPrioridad__id'),
                            )
                                
                    if (resumen):
                        acumulador += resumen['total']
                        if prioridad.nombre in total_columnaP:
                            total_columnaP[prioridad.nombre] += resumen['total']
                        else:
                            total_columnaP[prioridad.nombre] = resumen['total']
                        
                # registro_SubTotal = {
                #     'etiqueta':'subtotal',
                #     'valor':acumulador
                # }
                # if 'subtotal' in total_columnaP:
                #     total_columnaP['subtotal'] += acumulador
                # else:
                #     total_columnaP['subtotal'] = acumulador
                # lista_prioridades.insert(0, registro_SubTotal )       
        
            dataPadre['conteo_totalp'] = total_columnaP
            total['prioridad']=dataPadre
            
            # print(dataPadre)
            return Response({"Results": total}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)