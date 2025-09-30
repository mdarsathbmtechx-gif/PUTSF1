from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from django.conf import settings
from django.core.files.base import ContentFile
from putsf_backend.mongo import db
from django.utils import timezone
from bson.objectid import ObjectId
import os

class BannerAPIView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, mongo_id=None):
        banners_collection = db["banners"]

        if mongo_id:
            try:
                banner = banners_collection.find_one({"_id": ObjectId(mongo_id)})
                if not banner:
                    return Response({"error": "Banner not found"}, status=status.HTTP_404_NOT_FOUND)
                banner["_id"] = str(banner["_id"])
                return Response(banner)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            banners = list(banners_collection.find({}))
            for b in banners:
                b["_id"] = str(b["_id"])
            return Response(banners)

    def post(self, request):
        banners_collection = db["banners"]

        image_file = request.FILES.get("image")
        title = request.data.get("title")

        if not title or not image_file:
            return Response({"error": "Title and image are required"}, status=status.HTTP_400_BAD_REQUEST)

        if banners_collection.find_one({"title": title}):
            return Response({"error": "Banner with this title already exists"}, status=status.HTTP_400_BAD_REQUEST)

        media_path = os.path.join(settings.MEDIA_ROOT, "banner")
        os.makedirs(media_path, exist_ok=True)
        file_path = os.path.join(media_path, image_file.name)

        with open(file_path, "wb+") as f:
            for chunk in image_file.chunks():
                f.write(chunk)

        full_url = request.build_absolute_uri(f"/media/banner/{image_file.name}")

        data = {
            "title": title,
            "image_url": full_url,
            "created_at": timezone.now().isoformat()
        }

        result = banners_collection.insert_one(data)
        return Response({"message": "Banner added successfully!", "image_url": full_url, "_id": str(result.inserted_id)}, status=status.HTTP_201_CREATED)

    def delete(self, request, mongo_id):
        banners_collection = db["banners"]

        try:
            banner = banners_collection.find_one({"_id": ObjectId(mongo_id)})
            if not banner:
                return Response({"error": "Banner not found"}, status=status.HTTP_404_NOT_FOUND)

            image_url = banner.get("image_url")
            if image_url:
                relative_path = image_url.replace(request.build_absolute_uri("/"), "")
                file_path = os.path.join(settings.BASE_DIR, relative_path)
                if os.path.exists(file_path):
                    os.remove(file_path)

            banners_collection.delete_one({"_id": ObjectId(mongo_id)})
            return Response({"message": "Banner deleted successfully!"})

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
