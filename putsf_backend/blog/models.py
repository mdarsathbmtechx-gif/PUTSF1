from django.db import models
from django.conf import settings
from django.utils.text import slugify
from django.core.files.storage import FileSystemStorage

# Custom storage pointing to Static/blog/
static_storage = FileSystemStorage(location=settings.BASE_DIR / "putsf_backend" / "Static" / "blog")

class Blog(models.Model):
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True, null=True)
    content = models.TextField()
    # Store directly in Static/blog without extra subfolders
    image = models.ImageField(storage=static_storage, upload_to="", blank=True, null=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    status = models.CharField(
        max_length=10,
        choices=[("draft", "Draft"), ("published", "Published")],
        default="draft"
    )
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
