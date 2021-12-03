from django.urls import path, include
from rest_framework_nested import routers

from . import views


router = routers.DefaultRouter()
router.register('users', views.UserViewSet, basename="users")
router.register('assigned_evals', views.AssignedEvaluationViewSet, basename="assigned_evals")

users_router = routers.NestedSimpleRouter(router, 'users', lookup='user')
assigned_evals = routers.NestedSimpleRouter(router, 'assigned_evals', lookup='assigned_eval')


urlpatterns = [
    path('', include(router.urls)),
    path('', include(users_router.urls)),
    path('', include(assigned_evals.urls)),
    path('', include(assigned_evals.urls)),
]