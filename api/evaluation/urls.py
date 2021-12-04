from django.urls import path, include
from rest_framework_nested import routers

from . import views


router = routers.DefaultRouter()
router.register('users', views.UserViewSet, basename="users")
router.register('assigned_evals', views.AssignedEvaluationViewSet, basename="assigned_evals")
router.register('received_evals', views.ReceivedEvaluationViewSet, basename="received_evals")
router.register('task_items', views.TaskItemViewSet, basename="task_items")

users_router = routers.NestedSimpleRouter(router, 'users', lookup='user')
assigned_evals = routers.NestedSimpleRouter(router, 'assigned_evals', lookup='assigned_eval')
received_evals = routers.NestedSimpleRouter(router, 'received_evals', lookup='received_eval')
task_items = routers.NestedSimpleRouter(router, 'task_items', lookup='task_item')


urlpatterns = [
    path('', include(router.urls)),
    path('', include(users_router.urls)),
    path('', include(assigned_evals.urls)),
    path('', include(received_evals.urls)),
    path('', include(task_items.urls)),
]