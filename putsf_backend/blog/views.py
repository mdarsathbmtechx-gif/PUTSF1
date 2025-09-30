from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from django.utils import timezone
from django.conf import settings
from putsf_backend.mongo import db
import os
from bson.objectid import ObjectId  # MongoDB ObjectId

class BlogPostAPIView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, post_id=None):
        posts_collection = db["blog_posts"]

        if post_id:
            try:
                post = posts_collection.find_one({"_id": ObjectId(post_id)})
            except:
                return Response({"error": "Invalid post ID"}, status=status.HTTP_400_BAD_REQUEST)

            if not post:
                return Response({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)

            post["_id"] = str(post["_id"])  # convert ObjectId to string
            return Response(post)
        else:
            posts = list(posts_collection.find({}))
            for post in posts:
                post["_id"] = str(post["_id"])
            return Response(posts)

    def post(self, request):
        posts_collection = db["blog_posts"]

        title = request.data.get("title")
        subtitle = request.data.get("subtitle")
        content = request.data.get("content")
        status_post = request.data.get("status", "draft")
        image_file = request.FILES.get("image")

        if not title or not content or not image_file:
            return Response({"error": "Title, content, and image are required"}, status=status.HTTP_400_BAD_REQUEST)

        # Save image to media/blog/
        media_path = os.path.join(settings.MEDIA_ROOT, "blog")
        os.makedirs(media_path, exist_ok=True)
        file_path = os.path.join(media_path, image_file.name)

        with open(file_path, "wb+") as f:
            for chunk in image_file.chunks():
                f.write(chunk)

        image_url = request.build_absolute_uri(f"/media/blog/{image_file.name}")

        # Save to MongoDB
        post_data = {
            "title": title,
            "subtitle": subtitle,
            "content": content,
            "status": status_post,
            "image_url": image_url,
            "created_at": timezone.now().isoformat()
        }

        result = posts_collection.insert_one(post_data)
        post_data["_id"] = str(result.inserted_id)

        return Response({"message": "Blog post created successfully!", "post": post_data}, status=status.HTTP_201_CREATED)

    def delete(self, request, post_id):
        posts_collection = db["blog_posts"]
        try:
            obj_id = ObjectId(post_id)
        except:
            return Response({"error": "Invalid post ID"}, status=status.HTTP_400_BAD_REQUEST)

        post = posts_collection.find_one({"_id": obj_id})
        if not post:
            return Response({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)

        # Delete image file
        image_url = post.get("image_url")
        if image_url:
            # Remove domain from URL
            media_path = image_url.replace(request.build_absolute_uri('/'), '')
            file_path = os.path.join(settings.BASE_DIR, media_path)
            if os.path.exists(file_path):
                os.remove(file_path)

        posts_collection.delete_one({"_id": obj_id})
        return Response({"message": "Blog post deleted successfully!"}, status=status.HTTP_200_OK)

    def patch(self, request, post_id):
        """
        Update blog post partially, e.g., change status from draft → published
        """
        posts_collection = db["blog_posts"]
        try:
            obj_id = ObjectId(post_id)
        except:
            return Response({"error": "Invalid post ID"}, status=status.HTTP_400_BAD_REQUEST)

        post = posts_collection.find_one({"_id": obj_id})
        if not post:
            return Response({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)

        status_post = request.data.get("status")
        if status_post not in ["draft", "published"]:
            return Response({"error": "Invalid status"}, status=status.HTTP_400_BAD_REQUEST)

        posts_collection.update_one({"_id": obj_id}, {"$set": {"status": status_post}})
        post["status"] = status_post
        post["_id"] = str(post["_id"])
        return Response({"message": "Blog status updated successfully!", "post": post}, status=status.HTTP_200_OK)
