# Generated by Django 3.2.9 on 2021-12-04 09:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('evaluation', '0006_alter_taskitem_content'),
    ]

    operations = [
        migrations.AddField(
            model_name='taskitem',
            name='completed',
            field=models.BooleanField(default=False),
        ),
    ]