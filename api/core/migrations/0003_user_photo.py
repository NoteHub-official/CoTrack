# Generated by Django 3.2.9 on 2021-12-06 07:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_user_role'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='photo',
            field=models.CharField(default='', max_length=128),
        ),
    ]
