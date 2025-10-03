from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .views import home  # Add this

urlpatterns = [
    path("", home, name="home"),  # root path
    path("admin-django/", admin.site.urls),
    path("api/admin/", include("putsf_backend.accounts.urls")),
    path("api/gallery/", include("putsf_backend.gallery.urls")),
    path("api/", include("putsf_backend.banner.urls")),
    path("api/blog/", include("putsf_backend.blog.urls")),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
