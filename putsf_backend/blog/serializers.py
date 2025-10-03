from django.conf import settings
from django.templatetags.static import static
from rest_framework import serializers
from .models import Blog

class BlogSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Blog
        fields = ['_id', 'title', 'image', 'image_url', 'created_at']

    def get_image_url(self, obj):
        if obj.image:
            relative_url = static(f'blog/{obj.image.name}')
            return f"{settings.BASE_URL}{relative_url}"  # full URL for frontend
        return None
