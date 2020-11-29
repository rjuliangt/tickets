from rest_framework import serializers

from api.models.m_proyectos import Proyecto


class ProyectosResumenSemanalSerializer(serializers.ModelSerializer):
    resagado = serializers.IntegerField(default=0)
    class Meta:
        model = Proyecto
        fields = ('nombre', 'resagado')

class ProyectosResueltoSemanalSerializer(serializers.ModelSerializer):
    resuelto = serializers.IntegerField(default=0)
    class Meta:
        model = Proyecto
        fields = ('nombre', 'resuelto')

class ProyectosModelSerializer(serializers.ModelSerializer):
    idEmpresa = serializers.SerializerMethodField("getEmpresa")
    #empresa = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Proyecto
        fields = '__all__'
        depth = 1

    def getEmpresa(self, obj):
        if(obj.idEmpresa is not None):
            return {'value': obj.idEmpresa.id, 'label': obj.idEmpresa.nombre}
        return None


class serializadorProyectos(serializers.ModelSerializer):
    # idEmpresa = serializers.SerializerMethodField("getEmpresa")
    #empresa = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Proyecto
        fields = '__all__'
        depth = 1
