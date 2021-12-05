from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import action
from .serializers import UserSerializer, EvaluationSerializer, AddEvaluationSerializer, TaskListSerializer, TaskItemSerializer, AddTaskItemSerializer, UpdateEvaluationSerializer, MyEvaluationSerializer
from core.models import User
from .models import Evaluation, TaskList, TaskItem


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]


class AssignedEvaluationViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows evaluations to be viewed or edited.
    """
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        return {'request': self.request, 'id': self.kwargs.get('pk', None)}

    def get_queryset(self):
        user = self.request.user
        # get week kwargs from request
        week = self.request.query_params.get('week', None)
        if week is None:
            return Evaluation.objects.select_related('evaluated_user', 'task_list').prefetch_related('task_list__tasks').filter(evaluator=user)
        return Evaluation.objects.select_related('evaluated_user', 'task_list').prefetch_related('task_list__tasks').filter(evaluator=user, week=week)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return EvaluationSerializer
        elif self.request.method == 'POST':
            return AddEvaluationSerializer
        elif self.request.method == 'PATCH':
            return UpdateEvaluationSerializer
        return EvaluationSerializer

    @action(detail=False, methods=['PUT'], permission_classes=[IsAdminUser])
    def generate_weekly_evaluations(self, request):
        """
        Generate new evaluations for all users.
        """
        users = User.objects.all()
        week = self.request.get('week')
        for evaluator in users:
            for evaluated_user in users:
                if evaluator.id == evaluated_user:
                    continue
                serializer = AddEvaluationSerializer(data={
                    'evaluator': evaluator.id,
                    'evaluated_user': evaluated_user.id,
                    'content': "",
                    'week': week
                })
                serializer.is_valid(raise_exception=True)
                serializer.save()

        return self.list(request)


class TaskItemViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows task items to be viewed or edited
    """
    queryset = TaskItem.objects.all()
    permission_classes = [IsAuthenticated]

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
    http_method_names = ['get']
    serializer_class = MyEvaluationSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        return {'request': self.request}

    def get_queryset(self):
        user = self.request.user
        return TaskList.objects.prefetch_related('evaluations', 'tasks').filter(user=user).order_by('-week')
