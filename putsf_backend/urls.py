from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin-django/", admin.site.urls),
    path("api/admin/", include("putsf_backend.accounts.urls")),   # ✅ full path
    path('api/gallery/', include('putsf_backend.gallery.urls')),  # ✅ full path
    path("api/", include("putsf_backend.banner.urls")),           # ✅ full path
    path("api/blog/", include("putsf_backend.blog.urls")),  
    ]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
