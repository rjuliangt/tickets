from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status, filters
from rest_framework.viewsets import GenericViewSet
from django_filters.rest_framework import DjangoFilterBackend

from django.db.models import Count, Case, When, Sum, Q
from datetime import datetime, timedelta
import datetime as datetime_class
from django.utils import timezone
# Importacion de los modelos a usar en el reporte
from api.models import Proyecto, Estados, Prioridades, User, Tickets, Empresa

# importacion de serializer
from api.serializers import ProyectosResumenSemanalSerializer, ProyectosResueltoSemanalSerializer  

#creacion de los viewset 
class ReporteriaViewSet(GenericViewSet):
    queryset = Tickets.objects.filter(activo=True)


    @action(methods=["get"], detail=False)
    def reporteSemanal(self, request, *args, **kwargs):
        current_tz = timezone.get_current_timezone()
        fecha_inicial = request.query_params.get('fecha_inicial')
        fecha_final = request.query_params.get('fecha_final', fecha_inicial)
        fecha_inicial_format = datetime.strptime(fecha_inicial, "%d/%m/%Y")
        fecha_final_format = datetime.strptime(fecha_final, "%d/%m/%Y")

        fecha_inicial_format = current_tz.localize(fecha_inicial_format + timedelta(days=1))
        fecha_final_format = current_tz.localize(fecha_final_format + timedelta(days=1))

        semanas = self.find_weeks(fecha_inicial_format.date(), fecha_final_format.date())

        tabla = []
        for semana in semanas:
            _anio = semana.split('-')[0]
            _semana = semana.split('-')[1]

            inicio, fin = self.get_start_and_end_date_from_calendar_week(_anio, _semana)
            etiqueta = 'del {} al {}'.format(inicio.strftime('%d/%m/%Y'), fin.strftime('%d/%m/%Y'))
            data = self.tablaReporteSemanal(inicio.strftime('%d/%m/%Y'), fin.strftime('%d/%m/%Y'))
            tabla.append({'etiqueta': etiqueta, 'data': data })

        return Response(tabla, status=status.HTTP_200_OK)


    @action(methods=["get"], detail=False)
    def resumenSemanal(self, request, *args, **kwargs):
        current_tz = timezone.get_current_timezone()
        fecha_inicial = request.query_params.get('fecha_inicial')
        fecha_final = request.query_params.get('fecha_final', fecha_inicial)
        fecha_inicial_format = datetime.strptime(fecha_inicial, "%d/%m/%Y")
        fecha_final_format = datetime.strptime(fecha_final, "%d/%m/%Y")
        fecha_final_format = fecha_final_format + timedelta(days=1)
        fecha_inicial_format = current_tz.localize(fecha_inicial_format)
        fecha_final_format = current_tz.localize(fecha_final_format)
        estados = Estados.objects.filter(activo=True).exclude(nombre="Cerrado").exclude(nombre="Resuelto").values_list('id', flat=True)
        queryset = Proyecto.objects.filter(
                activo=True
            ).annotate(
                resagado=Count(
                    'idProyectoCliente__idEstado__nombre',
                        filter=Q(
                            idProyectoCliente__idEstado__id__in=estados,
                            idProyectoCliente__actualizado__range = [fecha_inicial_format, fecha_final_format]
                            )
                        )
                )
        serializer = ProyectosResumenSemanalSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


    @action(methods=["get"], detail=False)
    def resumenSemanalResueltos(self, request, *args, **kwargs):
        current_tz = timezone.get_current_timezone()
        fecha_inicial = request.query_params.get('fecha_inicial')
        fecha_final = request.query_params.get('fecha_final', fecha_inicial)
        fecha_inicial_format = datetime.strptime(fecha_inicial, "%d/%m/%Y")
        fecha_final_format = datetime.strptime(fecha_final, "%d/%m/%Y")
        fecha_final_format = fecha_final_format + timedelta(days=1)
        fecha_inicial_format = current_tz.localize(fecha_inicial_format)
        fecha_final_format = current_tz.localize(fecha_final_format)
        estados=(Estados.objects.filter(activo=True)
            .exclude(nombre="Cerrado")
            .filter(nombre="Resuelto")
            .values_list('id', flat=True))
        queryset = Proyecto.objects.filter(
                activo=True
            ).annotate(
                resuelto=Count(
                    'idProyectoCliente__idEstado__nombre',
                        filter=Q(
                            idProyectoCliente__idEstado__id__in=estados),
                            idProyectoCliente__actualizado__range=[fecha_inicial_format, fecha_final_format]
                    )
                )
        serializer = ProyectosResueltoSemanalSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


    @action(methods=["get"], detail=False)
    def reporteProgramador(self, request, *args, **kwargs):
        current_tz = timezone.get_current_timezone()
        fecha_inicial = request.query_params.get('fecha_inicial')
        fecha_final = request.query_params.get('fecha_final', fecha_inicial)
        fecha_inicial_format = datetime.strptime(fecha_inicial, "%d/%m/%Y")
        fecha_final_format = datetime.strptime(fecha_final, "%d/%m/%Y")
        fecha_inicial_format = current_tz.localize(fecha_inicial_format)
        fecha_final_format = current_tz.localize(fecha_final_format + timedelta(days=1))

        total_Estado = {}
        buscar = request.query_params.get('search')
        estados = Estados.objects.filter(activo=True)
        proyectos = Proyecto.objects.filter(activo=True)
        datos_respuesta = {}
        listado_proyectos = []
        grafida_color = {}
        data_grafida = []
        for proyecto in proyectos:
            encabezado_estados = []
            proyecto_nombre = proyecto.nombre
            datos_lista = {'estados': []}
            lista_estado = []
            estado_acumulado = 0
            for estado in estados:
                estado_nombre = estado.nombre
                encabezado_estados.append(estado_nombre)
                if(buscar != ''):
                    resumen = Tickets.objects.filter(
                                    activo=True,
                                    idEstado=estado,
                                    idProyecto=proyecto,
                                    actualizado__range=[fecha_inicial_format, fecha_final_format],
                                    idUsuarioAsignado__id=int(buscar)
                                    ).aggregate(
                                    total=Count('idEstado__id'),
                                    # horas_trabajadas=Sum('horasTrabajadas'),
                                    )
                if(buscar == 0 or buscar == '' ):
                    resumen = Tickets.objects.filter(
                                    activo=True,
                                    idEstado=estado,
                                    idProyecto=proyecto,
                                    actualizado__range=[fecha_inicial_format, fecha_final_format],
                                    # idUsuarioAsignado__first_name__contains=''
                                    ).aggregate(
                                    total=Count('idEstado__id'),
                                    # horas_trabajadas=Sum('horasTrabajadas'),
                                    )   
                if (resumen):
                    estado_registro = {
                        'etiqueta': estado.nombre,
                        'valor': resumen['total'],
                        # 'horas': resumen['horas_trabajadas']
                    }
                    
                    lista_estado.append(estado_registro)
                    estado_acumulado += resumen['total']
                    if estado.nombre in total_Estado:
                        total_Estado[estado.nombre] += resumen['total']
                        grafida_color[estado.nombre] = estado.color 
                    else:
                        total_Estado[estado.nombre] = resumen['total']

            # data_grafida.append(data_grafiaXY)
                    # total_general = {
                    #     'etiqueta': estado.nombre,
                    #     'valor': resumen['total']
                    # }
            registro_proyecto = {
                'etiqueta': proyecto_nombre,
                'data': datos_lista,
            }

            listado_proyectos.append(registro_proyecto)
            datos_lista['estados'] = lista_estado
        data_resumen = [{'Total': 0}, {'Pendientes': 0}, {'Resueltos': 0}]
        for val_estado in total_Estado:
            if val_estado == 'Resuelto' or val_estado == 'Cerrado':
                data_resumen[2]['Resueltos'] += total_Estado[val_estado]
            else:
                data_resumen[1]['Pendientes'] += total_Estado[val_estado]
            data_resumen[0]['Total'] = data_resumen[1]['Pendientes'] + \
                data_resumen[2]['Resueltos']
            data_grafida.append({'x': (val_estado).upper(), 'y': total_Estado[val_estado], 'color': grafida_color[val_estado]})

        encabezado_estados.append('Total horas invertidas')
        datos_respuesta['data_estados'] = data_grafida
        datos_respuesta['data_resumen'] = data_resumen
        datos_respuesta['encabezados'] = encabezado_estados
        datos_respuesta['proyectos'] = listado_proyectos
       
        return Response(datos_respuesta, status=status.HTTP_200_OK)


    @action(methods=["get"], detail=False)
    def reporteGeneral(self, request, *args, **kwargs):
        proyectos = Proyecto.objects.filter(activo=True)
        prioridades = Prioridades.objects.filter(activo=True)
        estados = Estados.objects.filter(activo=True)
        lista_proyectos = []
        dataPadre = {}
        total_columnaE = {}
        total_columnaP = {}
        for proyecto in proyectos:
            proyecto_nombre = proyecto.nombre
            acumulador = 0
            acumulador2 = 0
            data_list = {'prioridades':[], 'estados':[]}
            lista_prioridades = []
            lista_estados = []
            encabezado_prioridades = ['subtotal']
            encabezado_estados = ['subtotal']

            for prioridad in prioridades:
                etiqueta = prioridad.nombre
                encabezado_prioridades.append(etiqueta)
                resumen = Tickets.objects.filter(
                            activo=True,
                            idPrioridad=prioridad,
                            idProyecto=proyecto,
                           ).aggregate(
                                total=Count('idPrioridad__id'),
                            )

                if (resumen):
                    registro = {
                        'etiqueta':etiqueta,
                        'valor':resumen['total']
                        }
                    if etiqueta in total_columnaP:
                        total_columnaP[etiqueta] += resumen['total']
                    else:
                        total_columnaP[etiqueta] = resumen['total']
                    lista_prioridades.append(registro)
                    acumulador += resumen['total']

            registro_SubTotal = {
                'etiqueta':'subtotal',
                'valor':acumulador
            }
            if 'subtotal' in total_columnaP:
                total_columnaP['subtotal'] += acumulador
            else:
                total_columnaP['subtotal'] = acumulador
            lista_prioridades.insert(0, registro_SubTotal )       
            data_list['prioridades']=lista_prioridades

            for estado in estados:
                estado_nombre = estado.nombre
                encabezado_estados.append(estado_nombre)
                resumen = Tickets.objects.filter(
                            activo=True,
                            idEstado=estado,
                            idProyecto=proyecto,
                            ).aggregate(
                            total=Count('idPrioridad__id') 
                            )   
                if (resumen):
                    e_registro = {
                        'etiqueta': estado.nombre,
                        'valor': resumen['total']
                    }
                    lista_estados.append(e_registro)
                    acumulador2 += resumen['total']
                    if estado.nombre in total_columnaE:
                        total_columnaE[estado.nombre] += resumen['total']
                    else:
                        total_columnaE[estado.nombre] = resumen['total']
            estado_sub_total = {
                'etiqueta':'subtotal',
                'valor':acumulador2
            }
            if 'subtotal' in total_columnaE:
                total_columnaE['subtotal'] += acumulador2
            else:
                total_columnaE['subtotal'] = acumulador2
            lista_estados.insert(0, estado_sub_total)
            data_list['estados']=lista_estados

            registro_proyecto = {
                'etiqueta': proyecto_nombre,
                'data': data_list,
            }
            lista_proyectos.append(registro_proyecto)

        dataPadre['proyectos'] = lista_proyectos
        dataPadre['encabezado_estados'] = encabezado_estados
        dataPadre['encabezado_prioridades'] = encabezado_prioridades
        dataPadre['conteo_totalE'] = total_columnaE
        dataPadre['conteo_totalp'] = total_columnaP
        return Response(dataPadre, status=status.HTTP_200_OK)


    @action(methods=["get"], detail=False)
    def reporteControlSoporte(self, request, *args, **kwargs):
        fecha_inicial = request.query_params.get('fecha_inicial')
        fecha_final = request.query_params.get('fecha_final', fecha_inicial)
        fecha_inicial_format = datetime.strptime(fecha_inicial, "%d/%m/%Y")
        fecha_final_format = datetime.strptime(fecha_final, "%d/%m/%Y") + timedelta(days=1)
        id_asignado = request.query_params.get('search')
        nombre_empresa = request.query_params.get('empresa')
        all_Empresas = Empresa.objects.filter(activo=True)

        data_response = {}
        data_Control = []
        encabezado = ['Empresa', 'No. de ticket', 'Horas invertidas', 'Ciclo de vida (horas) Total',
                        'Fecha Entrante a soporte','Fecha tomada', 'fecha finalizada', 'Estado'  
                    ]
        if (nombre_empresa == '' and id_asignado == ''):
            # sin campo empresa ni id usuario asignado
            data_Control.clear()
            for empresa in all_Empresas:
                instancia = Tickets.objects.filter(
                                activo=True,
                                # idUsuarioAsignado=id_asignado,
                                fechaInicio__range=[
                                    fecha_inicial_format, fecha_final_format],
                                fechafin__range=[fecha_inicial_format, fecha_final_format],
                                idProyecto__idEmpresa=empresa
                ).values('idProyecto__idEmpresa__nombre','pk', 'horasTrabajadas', 'cicloVida', 'creado', 'fechaInicio', 'fechafin','idEstado__nombre', 'idEstado__color')
                for ticket in instancia:
                    data_Control.append(ticket)
        
        if(nombre_empresa!='' and id_asignado != ''):
            # con los campos de empresa y id_usuario
            data_Control.clear()
            instancia = Tickets.objects.filter(
                                activo=True,
                                idUsuarioAsignado=id_asignado,
                                fechaInicio__range=[fecha_inicial_format, fecha_final_format],
                                fechafin__range=[fecha_inicial_format, fecha_final_format],
                                idProyecto__idEmpresa__nombre__contains=nombre_empresa
                ).values('idProyecto__idEmpresa__nombre','pk', 'horasTrabajadas', 'cicloVida', 'creado', 'fechaInicio', 'fechafin','idEstado__nombre', 'idEstado__color')
            for ticket in instancia:
                    data_Control.append(ticket)

        if (id_asignado != '' and nombre_empresa == '' ):
            # solo con id usuario asigando
            data_Control.clear()
            for empresa in all_Empresas:
                instancia = Tickets.objects.filter(
                                activo=True,
                                idUsuarioAsignado=id_asignado,
                                fechaInicio__range=[
                                    fecha_inicial_format, fecha_final_format],
                                fechafin__range=[fecha_inicial_format, fecha_final_format],
                                idProyecto__idEmpresa=empresa
                ).values('idProyecto__idEmpresa__nombre','pk', 'horasTrabajadas', 'cicloVida', 'creado', 'fechaInicio', 'fechafin','idEstado__nombre', 'idEstado__color')
                for ticket in instancia:
                    data_Control.append(ticket)

        data_response['encabezados'] = encabezado
        data_response['data'] = data_Control
        return Response(data_response, status=status.HTTP_200_OK)

    
    def find_weeks(self, start,end):
            l = []
            for i in range((end-start).days + 1):
                d = (start+datetime_class.timedelta(days=i)).isocalendar()[:2] # e.g. (2011, 52)
                yearweek = '{}-{:02}'.format(*d) # e.g. "201152"
                l.append(yearweek)
            return sorted(set(l))

    def get_start_and_end_date_from_calendar_week(self, year, calendar_week):
        calendar_week = int(calendar_week)- 1
        monday = datetime.strptime(f'{year}-{str(calendar_week)}-1', "%Y-%W-%w").date()
        return monday, monday + datetime_class.timedelta(days=6.9)


    def tablaReporteSemanal(self, fecha_inicial, fecha_final):
        current_tz = timezone.get_current_timezone()
        fecha_inicial_format = datetime.strptime(fecha_inicial, "%d/%m/%Y")
        fecha_final_format = datetime.strptime(fecha_final, "%d/%m/%Y")
        fecha_inicial_format = current_tz.localize(fecha_inicial_format)
        fecha_final_format = current_tz.localize(fecha_final_format)

        proyectos = Proyecto.objects.filter(activo=True)
        prioridades = Prioridades.objects.filter(activo=True)
        estados = Estados.objects.filter(activo=True)
        lista_proyectos = []
        dataPadre = {}
        total_columnaE = {}
        total_columnaP = {}
        for proyecto in proyectos:
            proyecto_nombre = proyecto.nombre
            acumulador = 0
            acumulador2 = 0
            data_list = {'prioridades':[], 'estados':[]}
            lista_prioridades = []
            lista_estados = []
            encabezado_prioridades = ['subtotal']
            encabezado_estados = ['subtotal']
            
            for prioridad in prioridades:
                etiqueta = prioridad.nombre
                encabezado_prioridades.append(etiqueta)
                resumen = Tickets.objects.filter(
                            activo=True,
                            idPrioridad=prioridad,
                            idProyecto=proyecto,
                            actualizado__range=[fecha_inicial_format,fecha_final_format]
                            ).aggregate(
                                total=Count('idPrioridad__id'),
                                # horas_trabajadas=Sum('horasTrabajadas'),
                            )
                            
                if (resumen):
                    registro = {
                        'etiqueta':etiqueta,
                        'valor': resumen['total'],
                        # 'horas': resumen['horas_trabajadas']
                        }
                    if etiqueta in total_columnaP:
                        total_columnaP[etiqueta] += resumen['total']
                    else:
                        total_columnaP[etiqueta] = resumen['total']
                    lista_prioridades.append(registro)
                    acumulador += resumen['total']
                    
            registro_SubTotal = {
                'etiqueta':'subtotal',
                'valor':acumulador
            }
            if 'subtotal' in total_columnaP:
                total_columnaP['subtotal'] += acumulador
            else:
                total_columnaP['subtotal'] = acumulador
            lista_prioridades.insert(0, registro_SubTotal )       
            data_list['prioridades']=lista_prioridades
            
            for estado in estados:
                estado_nombre = estado.nombre
                encabezado_estados.append(estado_nombre)
                resumen = Tickets.objects.filter(
                            activo=True,
                            idEstado=estado,
                            idProyecto=proyecto,
                            actualizado__range=[fecha_inicial_format, fecha_final_format]
                            ).aggregate(
                            total=Count('idPrioridad__id') 
                            )   
                if (resumen):
                    e_registro = {
                        'etiqueta': estado.nombre,
                        'valor': resumen['total']
                    }
                    lista_estados.append(e_registro)
                    acumulador2 += resumen['total']
                    if estado.nombre in total_columnaE:
                        total_columnaE[estado.nombre] += resumen['total']
                    else:
                        total_columnaE[estado.nombre] = resumen['total']
            estado_sub_total = {
                'etiqueta':'subtotal',
                'valor':acumulador2
            }
            if 'subtotal' in total_columnaE:
                total_columnaE['subtotal'] += acumulador2
            else:
                total_columnaE['subtotal'] = acumulador2
            lista_estados.insert(0, estado_sub_total)
            data_list['estados']=lista_estados
            
            registro_proyecto = {
                'etiqueta': proyecto_nombre,
                'data': data_list,
            }
            lista_proyectos.append(registro_proyecto)
            
        dataPadre['proyectos'] = lista_proyectos
        dataPadre['encabezado_estados'] = encabezado_estados
        dataPadre['encabezado_prioridades'] = encabezado_prioridades
        dataPadre['conteo_totalE'] = total_columnaE
        dataPadre['conteo_totalp'] = total_columnaP
        return dataPadre
    
    @action(methods=["get"], detail=False)
    def datosProgramadorDiseñador(self, request, *args, **kwargs):
        id_asignado = int(request.query_params.get('search'))
        data_usuario =  User.objects.filter(pk=id_asignado).values('first_name','last_name','idCategoria__nombre', 'scrum_master__first_name', 'idPuesto__nombre' )
        return Response(data_usuario, status=status.HTTP_200_OK)
    




