from rest_framework import serializers
from core.models import User
from .models import Evaluation


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}


class EvaluationSerializer(serializers.ModelSerializer):
    """
    Serializer for Evaluation objects.
    """
    evaluated_user = UserSerializer()

    class Meta:
        model = Evaluation
        fields = ('id', 'content', 'rating', 'evaluated_user', 'created_at', 'updated_at', 'completed')


class AddEvaluationSerializer(serializers.ModelSerializer):
    """
    Serializer for Evaluation objects.
    """

    class Meta:
        model = Evaluation
        fields = ('id', 'content', 'rating', 'evaluated_user', 'created_at', 'updated_at', 'completed')


    def save(self):
        request = self.context.get('request')
        try:
            content = self.validated_data.get('content')
            rating = self.validated_data.get('rating')
            evaluator = request.user
            evaluated_user = self.validated_data.get('evaluated_user')
            evaluation = Evaluation.objects.create(
                content=content,
                rating=rating,
                evaluator=evaluator,
                evaluated_user=evaluated_user
            )
        except User.DoesNotExist:
            # return error message
            raise serializers.ValidationError("Evaluated user does not exist")
        return evaluation
