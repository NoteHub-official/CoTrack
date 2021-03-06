# Generated by Django 3.2.9 on 2021-12-03 07:27

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Evaluation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.CharField(max_length=512)),
                ('rating', models.IntegerField(validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(10)])),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('completed', models.BooleanField(default=False)),
                ('evaluated_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='received_evaluations', to=settings.AUTH_USER_MODEL)),
                ('evaluator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='assigned_evaluations', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
