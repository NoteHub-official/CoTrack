from rest_framework import serializers
from core.models import User
from .models import Evaluation, TaskList, TaskItem

"""
User serializer
"""
class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}


"""
Task Item serializer
"""
class TaskItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = TaskItem
        fields = ('id', 'content', 'completed')


class AddTaskItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = TaskItem
        fields = ('task_list', 'content')


"""
Task List serializer
"""
class TaskListSerializer(serializers.ModelSerializer):
    tasks = TaskItemSerializer(many=True, read_only=True)

    class Meta:
        model = TaskList
        fields = ('id', 'week', 'created_at', 'tasks')


"""
Evaluation serializer
"""
class EvaluationSerializer(serializers.ModelSerializer):
    evaluated_user = UserSerializer()
    task_list = TaskListSerializer()

    class Meta:
        model = Evaluation
        fields = ('id', 'week', 'content', 'rating', 'evaluated_user', 'created_at', 'completed', 'task_list')


class AddEvaluationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Evaluation
        fields = ('id', 'week', 'content', 'evaluated_user', 'created_at')

    def save(self):
        request = self.context.get('request')
        try:
            content = self.validated_data.get('content')
            evaluator = request.user
            week = self.validated_data.get('week')
            evaluated_user = self.validated_data.get('evaluated_user')
            # get or create a new task_list
            task_list = TaskList.objects.get_or_create(user=evaluated_user, week=week)[0]
            evaluation = Evaluation.objects.create(
                week=week,
                content=content,
                evaluator=evaluator,
                evaluated_user=evaluated_user,
                task_list=task_list
            )
            self.instance = evaluation
        except User.DoesNotExist:
            # return error message
            raise serializers.ValidationError("Evaluated user does not exist")

        return self.instance


class UpdateEvaluationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Evaluation
        fields = ('content', 'rating', 'completed')
        extra_kwargs = {'completed': {'read_only': True}}

    def save(self):
        content = self.validated_data.get('content')
        rating = self.validated_data.get('rating')
        print(self.context)
        try:
            evaluation = Evaluation.objects.get(id=self.context['id'])
            if content is not None:
                evaluation.content = content
            if rating is not None:
                evaluation.rating = rating
            # set completed
            evaluation.completed = True
            evaluation.save()
            self.instance = evaluation
        except Evaluation.DoesNotExist:
            # return error message
            raise serializers.ValidationError("Evaluation does not exist")

        return super().save()


class TaskListEvaluationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Evaluation
        fields = ('content', 'rating', 'completed', 'evaluator', 'created_at')


class MyEvaluationSerializer(serializers.ModelSerializer):
    evaluations = TaskListEvaluationSerializer(many=True, read_only=True)
    tasks = TaskItemSerializer(many=True, read_only=True)

    class Meta:
        model = TaskList
        fields = ('id', 'week', 'created_at', 'evaluations', 'tasks')