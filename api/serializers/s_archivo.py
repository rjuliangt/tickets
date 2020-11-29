from rest_framework import serializers
from api.models import Archivos


class ArchivosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Archivos
        fields = ('archivo','id',)