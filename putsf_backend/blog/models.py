# blog/models.py
from django.db import models
from django.core.files.storage import FileSystemStorage
from django.conf import settings
import os

# Force images to static/blog instead of media/blog
blog_storage = FileSystemStorage(
    location=os.path.join(settings.BASE_DIR, "putsf_backend", "static", "blog"),
    base_url="/static/blog/"
)

class Blog(models.Model):
    title = models.CharField(max_length=255)
    image = models.ImageField(upload_to='', storage=blog_storage, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
