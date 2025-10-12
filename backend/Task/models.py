from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Task(models.Model):
    class TaskStatus(models.TextChoices):
        TODO = 'TODO', 'ToDo'
        ONGOING = 'ONGOING', 'OnGoing'
        REVIEW = 'REVIEW', 'Review'
        DONE = 'DONE', 'Done'
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="tasks")
    title = models.CharField(max_length=100)
    created_date = models.DateField(auto_now_add=True)
    desc = models.TextField()
    is_done = models.CharField(
        max_length=10,
        choices=TaskStatus.choices,
        default=TaskStatus.TODO
    )

    def __str__(self):
        return self.title