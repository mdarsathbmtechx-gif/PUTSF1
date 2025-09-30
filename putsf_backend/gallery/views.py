from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings
from putsf_backend.mongo import db
from django.utils import timezone
from bson.objectid import ObjectId
import os

class GalleryImageAPIView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, mongo_id=None):
        images_collection = db["gallery_images"]

        if mongo_id:
            try:
                image = images_collection.find_one({"_id": ObjectId(mongo_id)})
                if not image:
                    return Response({"error": "Image not found"}, status=status.HTTP_404_NOT_FOUND)
                # convert _id to string for frontend
                image["_id"] = str(image["_id"])
                return Response(image)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            images = list(images_collection.find({}))
            # convert _id to string for all images
            for img in images:
                img["_id"] = str(img["_id"])
            return Response(images)

    def post(self, request):
        images_collection = db["gallery_images"]

        image_file = request.FILES.get("image")
        title = request.data.get("title")

        if not image_file or not title:
            return Response({"error": "Title and image are required"}, status=status.HTTP_400_BAD_REQUEST)

        if images_collection.find_one({"title": title}):
            return Response({"error": "Image with this title already exists"}, status=status.HTTP_400_BAD_REQUEST)

        # Save file to media folder
        media_path = os.path.join(settings.MEDIA_ROOT, "gallery")
        os.makedirs(media_path, exist_ok=True)
        file_path = os.path.join(media_path, image_file.name)

        with open(file_path, "wb+") as f:
            for chunk in image_file.chunks():
                f.write(chunk)

        # Build absolute URL
        full_url = request.build_absolute_uri(f"/media/gallery/{image_file.name}")

        data = {
            "title": title,
            "image_url": full_url,
            "created_at": timezone.now().isoformat()
        }

        result = images_collection.insert_one(data)
        return Response({"message": "Image added successfully!", "image_url": full_url, "_id": str(result.inserted_id)}, status=status.HTTP_201_CREATED)

    def delete(self, request, mongo_id):
        images_collection = db["gallery_images"]

        try:
            image = images_collection.find_one({"_id": ObjectId(mongo_id)})
            if not image:
                return Response({"error": "Image not found"}, status=status.HTTP_404_NOT_FOUND)

            # Delete file from media folder
            image_url = image.get("image_url")
            if image_url:
                relative_path = image_url.replace(request.build_absolute_uri("/"), "")
                file_path = os.path.join(settings.BASE_DIR, relative_path)
                if os.path.exists(file_path):
                    os.remove(file_path)

            images_collection.delete_one({"_id": ObjectId(mongo_id)})
            return Response({"message": "Image deleted successfully!"})

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
