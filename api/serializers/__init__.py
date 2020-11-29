from .user import UserSerializer, UserReadSerializer, UserUpdateSerializer, UserSerializerCrear, UserUpdateSerializerForeing,UserSerializerProyectos
from .empresa import EmpresaSerializer, EmpresaRegistroSerializer
from .s_categorias import CategoriaSerializer, CategoriaRegistroSerializer
from .s_tickets import TicketSerializer, TicketRegistroSerializer, TicketLecturaSerializer
from .s_proyecto import *
from .s_fusion import FusionModelSerializer
from .s_puestos import PuestoSerializer, PuestoCreateSerializer, PuestoReadSerializer
from .s_permiso import PermisoCreateSerializer, PermisoReadSerializer, PermisoSerializer
from .s_roles import CreateModelSerializer, RolesModelSerializer
from .s_archivo import ArchivosSerializer