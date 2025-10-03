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
            return static(f'blog/{obj.image.name.split("/")[-1]}')  # just the filename
        return None
