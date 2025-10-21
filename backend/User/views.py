from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer
from rest_framework import permissions
from rest_framework_simplejwt.authentication import JWTAuthentication

# Create your views here.

class UserCreateView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=201)
        return Response(status=400)

class UserDeleteView(APIView):
    permission_classes = [JWTAuthentication]
    def delete(self, request):
        request.user.delete()
        return Response(status=204)