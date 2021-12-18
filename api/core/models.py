from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class User(AbstractUser):
    role = models.CharField(max_length=32, default="")
    photo = models.CharField(max_length=128, default="")