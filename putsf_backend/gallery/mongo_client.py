from pymongo import MongoClient
from django.conf import settings

client = MongoClient(settings.MONGO_URI)
db = client[settings.MONGO_DB_NAME]
gallery_collection = db['gallery_images']
