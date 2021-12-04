from rest_framework import viewsets

from .serializers import UserSerializer, EvaluationSerializer, AddEvaluationSerializer, TaskListSerializer, TaskItemSerializer, AddTaskItemSerializer, UpdateEvaluationSerializer, MyEvaluationSerializer
from core.models import User
from .models import Evaluation, TaskList, TaskItem


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer


class AssignedEvaluationViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows evaluations to be viewed or edited.
    """

    def get_serializer_context(self):
        return {'request': self.request, 'id': self.kwargs.get('pk', None)}

    def get_queryset(self):
        user = self.request.user
        # get week kwargs from request
        week = self.request.query_params.get('week', None)
        if week is None:
            return Evaluation.objects.none()
        return Evaluation.objects.select_related('evaluated_user', 'task_list').prefetch_related('task_list__tasks').filter(evaluator=user, week=week)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return EvaluationSerializer
        elif self.request.method == 'POST':
            return AddEvaluationSerializer
        elif self.request.method == 'PATCH':
            return UpdateEvaluationSerializer
        return EvaluationSerializer


class TaskItemViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows task items to be viewed or edited
    """
    queryset = TaskItem.objects.all()

    def get_serializer_context(self):
        return {'request': self.request}

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return TaskItemSerializer
        elif self.request.method == 'POST':
            return AddTaskItemSerializer
        return TaskItemSerializer


class ReceivedEvaluationViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows evaluations to be viewed or edited (only GET).
    """
    serializer_class = MyEvaluationSerializer

    def get_serializer_context(self):
        return {'request': self.request}

    def get_queryset(self):
        user = self.request.user
        return Evaluation.objects.select_related('evaluated_user', 'task_list').prefetch_related('task_list__tasks').filter(evaluated_user=user)

