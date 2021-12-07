from django.contrib import admin
from django.urls import path, include
import debug_toolbar
from .views import index
urlpatterns = [
    path("", index, name="index"),
    path('admin/', admin.site.urls),
    path('api/', include('evaluation.urls')),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('__debug__', include(debug_toolbar.urls)),
]
