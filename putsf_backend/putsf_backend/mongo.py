# putsf_backend/mongo.py
from pymongo import MongoClient
from django.conf import settings

client = MongoClient(settings.MONGO_URI)  # Mongo URI from settings.py
db = client[settings.MONGO_DB_NAME]       # Database name from settings.py
