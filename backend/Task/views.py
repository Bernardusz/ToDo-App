from .models import Task
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from .serializer import TaskSerializer
from .models import Task
from django.shortcuts import get_object_or_404
from rest_framework.pagination import PageNumberPagination
from math import ceil
from django.db.models import Q
# Create your views here.
class TaskViewSetList(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        search_query = request.GET.get('search', '')
        status_query = request.GET.get('status', '')
        Tasks = Task.objects.filter(
            Q(user=self.request.user),
            Q(title__icontains=search_query),
            Q(is_done = status_query) if status_query else Q()
        )

        paginator = PageNumberPagination()
        paginator.page_size = 10
        result_page = paginator.paginate_queryset(Tasks,request=request)
        
        serializer = TaskSerializer(result_page, many=True)
        
        total_items = Tasks.count()
        page_size = paginator.page_size
        total_pages = ceil(total_items / page_size)
        
        response_data = {
            "total_pages" : total_pages,
            "count" : total_items,
            "next" : paginator.get_next_link(),
            "previous" : paginator.get_previous_link(),
            "results" : serializer.data
        }

        return Response(response_data)
    
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



