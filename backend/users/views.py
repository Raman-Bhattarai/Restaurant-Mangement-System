from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import User
from .serializers import RegisterSerializer, UserSerializer
from rest_framework.generics import ListAPIView
from rest_framework.decorators import api_view, permission_classes

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer


class LoginView(generics.GenericAPIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)

        if not user:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

        refresh = RefreshToken.for_user(user)
        return Response({
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "phone": user.phone,
                "address": user.address,
            },
            "token": str(refresh.access_token),
            "refresh": str(refresh),
        })


class LogoutView(generics.GenericAPIView):
    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
        except Exception:
            return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
    

# Customers endpoint
class CustomerListView(ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]  # only admins can view customers

    def get_queryset(self):
        return User.objects.filter(is_staff=False)  # Only customers


# Staff endpoint
class StaffListView(ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]  # only admins can view staff

    def get_queryset(self):
        return User.objects.filter(is_staff=True)  # Only staff
    
    
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)
