from .models import Task
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from .serializer import TaskSerializer
from .models import Task
from django.shortcuts import get_object_or_404
# Create your views here.
class TaskViewSetList(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        Tasks = Task.objects.filter(user=self.request.user)
        serializer = TaskSerializer(Tasks, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=self.request.user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class TaskViewSetDetail(APIView):

    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_task_object(self, pk):
        return get_object_or_404(Task, pk=pk, user=self.request.user)

    def get(self, request, pk):
        TheTask = self.get_task_object(pk=pk)
        serializer = TaskSerializer(TheTask)
        return Response(serializer.data)
    
    def patch(self, request, pk):
        TheTask = self.get_task_object(pk=pk)
        serializer = TaskSerializer(TheTask, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)
    
    def put(self,request, pk):
        TheTask = self.get_task_object(pk=pk)
        serializer = TaskSerializer(TheTask, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)
    def delete(self, request, pk):
        TheTask = self.get_task_object(pk=pk)
        TheTask.delete()
        return Response(status=204)



