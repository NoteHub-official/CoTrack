from django.contrib import admin
from . import models


# Register your models here.
@admin.register(models.Evaluation)
class EvaluationAdmin(admin.ModelAdmin):
    list_display = ('content', 'rating', 'evaluator', 'evaluated_user', 'created_at', 'updated_at', 'completed')
    list_filter = ('created_at',)
    search_fields = ('content', 'evaluator', 'evaluated_user')