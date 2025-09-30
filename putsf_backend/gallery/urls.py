from django.urls import path
from .views import GalleryImageAPIView

urlpatterns = [
    path('images/', GalleryImageAPIView.as_view()),               # GET all / POST
    path('images/<str:mongo_id>/', GalleryImageAPIView.as_view()),  # GET/DELETE by _id
]
