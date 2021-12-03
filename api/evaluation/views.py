from rest_framework import viewsets

from .serializers import UserSerializer, EvaluationSerializer, AddEvaluationSerializer
from core.models import User
from .models import Evaluation


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
    serializer_class = EvaluationSerializer

    def get_serializer_context(self):
        return {'request': self.request}

    def get_queryset(self):
        user = self.request.user
        return Evaluation.objects.filter(evaluator=user, created_at__gt=start_of_week(), completed=False)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return EvaluationSerializer
        elif self.request.method == 'POST':
            return AddEvaluationSerializer
        return AddEvaluationSerializer


def start_of_week():
    """
    Returns the starting date of the current week.
    """
    from datetime import datetime, timedelta
    today = datetime.today()
    return today - timedelta(days=today.weekday())