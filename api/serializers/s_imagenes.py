from rest_framework import serializers
from api.models import Imagenes


class ImagenesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Imagenes
        fields = ('imagen',)
