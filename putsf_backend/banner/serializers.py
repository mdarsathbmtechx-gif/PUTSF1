from rest_framework import serializers
from django.conf import settings
from .models import Banner


class BannerSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Banner
        fields = ['id', 'title', 'subtitle', 'image', 'image_url']

    def get_image_url(self, obj):
        if obj.image:
            return f"{settings.BASE_URL}/media/{obj.image.name}"
        return ""
