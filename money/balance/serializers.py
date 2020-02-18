from rest_framework import serializers
from .models import Transaction, Pocket, Category, Budget
from django.db.models import Sum
from django.contrib.auth.models import User

class UserToBudgetInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name')

class PocketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pocket
        fields = ('id', 'budget', 'name')

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'budget')

class TransactionSerializer(serializers.ModelSerializer):
    pocket_ref = PocketSerializer(source="pocket", read_only=True)
    category_ref = CategorySerializer(source="category", read_only=True)

    class Meta:
        model = Transaction
        fields = ('id', 'title', 'description', 'category', 'date', 'debit', 'credit', 'pocket', 'pocket_ref', 'category_ref' )
        extra_kwargs = {
            'pocket': {'write_only': True},
            'category': {'write_only': True}
        }

class BudgetSerializer(serializers.ModelSerializer):
    total = serializers.SerializerMethodField('get_total')
    user_list = UserToBudgetInfoSerializer(many=True)
#     users = UserSerializer()

    def get_total(self, item):
        creds = Transaction.objects.all().filter(pocket__budget=item).aggregate(Sum('credit'))
        credit = creds['credit__sum'] or 0
        debs = Transaction.objects.all().filter(pocket__budget=item).aggregate(Sum('debit'))
        debit = debs['debit__sum'] or 0
        return debit-credit

    class Meta:
        model = Budget
        fields = ('id', 'name', 'user_list', 'total', 'user_list')
