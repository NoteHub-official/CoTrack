# Generated by Django 3.2.9 on 2021-12-06 06:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('evaluation', '0008_auto_20211205_0138'),
    ]

    operations = [
        migrations.AddField(
            model_name='taskitem',
            name='sub_content',
            field=models.CharField(default='', max_length=512),
        ),
    ]
