from django.urls import path
from .views import TaskViewSetList, TaskViewSetDetail

urlpatterns = [
    path('', TaskViewSetList.as_view(), name='task-list'),
    path('<int:pk>/', TaskViewSetDetail.as_view(), name='task-detail')
]