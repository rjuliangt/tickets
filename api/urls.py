from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from django.conf.urls import url
from api import viewsets
from api.viewsets.v_ticketPropiedades import (
    TipoViewSet,
    EstadoViewSet,
    PrioridadViewSet,
    EtiquetaViewSet,
    TicketAprobado
)
from api.viewsets.v_usuario import (
    AgenteViewSet,
    ClienteViewSet,
    ProgramadorViewSet,
    ProgramadorDiseñadorViewSet
)
from api.viewsets.v_comentarios import ComentarioViewSet
from api.viewsets.v_reporteria import ReporteriaViewSet
from api.viewsets.v_dashboard import DashboardViewSet
from api.viewsets.v_puestos import PuestosViewSet
from api.viewsets.v_permiso import PermisoViewSet


router = DefaultRouter()
router.register(r'user', viewsets.UserViewset)
router.register(r'roles', viewsets.RolesViewSet, basename='roles')
router.register(r'empresa', viewsets.EmpresaViewset)
router.register(r'categoria', viewsets.CategoriaViewSet)
router.register(r'tickets', viewsets.TicketsViewSet)
router.register(r'proyecto', viewsets.ProyectoViewset, basename='proyecto')

# ---- Propiedades del ticket ---
router.register(r'ticket/tipos', TipoViewSet)
router.register(r'ticket/estados', EstadoViewSet)
router.register(r'ticket/prioridades', PrioridadViewSet)
router.register(r'ticket/etiquetas', EtiquetaViewSet)
router.register(r'ticket/comentarios', ComentarioViewSet)
router.register(r'ticket/aprobados', TicketAprobado)

# ---- Propiedades del ticket USUARIO ---
router.register(r'usuario/agente', AgenteViewSet)
router.register(r'usuario/cliente', ClienteViewSet)
router.register(r'usuario/programador', ProgramadorViewSet)
router.register(r'usuario/programadorDiseñador', ProgramadorDiseñadorViewSet)
# ---- - - - - - - - - - - ---
# ---- Puestos del USUARIO ---
router.register(r'puesto', PuestosViewSet)
# ---- Permisos del USUARIO ---
router.register(r'permiso', PermisoViewSet)

# ---- FUSION TICKET --------------------------------------
router.register(r'fusion', viewsets.FusionViewset, basename='fusion')
# router.register(r'usuario/cliente', ClienteViewSet)
# router.register(r'usuario/programador', ProgramadorViewSet)

# ---- REPORTERIA DE TICKETS -------------------------
router.register(r'reporteria', ReporteriaViewSet)

# ---- DASHBOARD -------------------------------
router.register(r'dashboard', DashboardViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    url(r"^api/token", obtain_auth_token, name="api-token"),
    path('api-auth/', include('rest_framework.urls')),
]
