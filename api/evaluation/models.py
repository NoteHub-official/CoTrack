from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.conf import settings


class TaskList(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    week = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(52)], default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class TaskItem(models.Model):
    task_list = models.ForeignKey(TaskList, on_delete=models.CASCADE, related_name="tasks")
    content = models.CharField(max_length=512, default="")
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Evaluation(models.Model):
    content = models.CharField(max_length=512, blank=True)
    # rating is a integer between 0 to 10
    rating = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)
    evaluator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='assigned_evaluations')
    evaluated_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='received_evaluations')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    week = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(52)], default=1)
    completed = models.BooleanField(default=False)
    task_list = models.ForeignKey(TaskList, on_delete=models.CASCADE, related_name="evaluations", null=True)



