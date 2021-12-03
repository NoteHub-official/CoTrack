from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.conf import settings


class Evaluation(models.Model):
    content = models.CharField(max_length=512)
    # rating is a integer between 0 to 10
    rating = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(10)])
    evaluator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='assigned_evaluations')
    evaluated_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='received_evaluations')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    completed = models.BooleanField(default=False)