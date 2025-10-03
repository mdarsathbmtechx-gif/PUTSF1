from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from .models import AdminUser

class AdminLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = AdminUser.objects(email=data['email']).first()
        if not user or not user.check_password(data['password']):
            raise serializers.ValidationError("Invalid email or password")

        refresh = RefreshToken.for_user(user)
        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }
