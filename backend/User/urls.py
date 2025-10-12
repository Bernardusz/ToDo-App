from django.urls import path
from .views import UserCreateView, UserDeleteView

urlpatterns = [
    path('create/', UserCreateView.as_view(), name='user-create'),
    path('delete/', UserDeleteView.as_view(), name='user-delete')
]