from rest_framework import serializers
from api.models.m_categorias import Categorias

class CategoriaSerializer(serializers.ModelSerializer):
  
    class Meta:
        model = Categorias
        fields = '__all__'
      

class CategoriaRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorias
        fields = '__all__'