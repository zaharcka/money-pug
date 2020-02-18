from django.shortcuts import render
from rest_framework import viewsets, permissions
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.views import APIView
from django.http import HttpResponse

from .models import Transaction, Budget, Pocket, Category
from .serializers import TransactionSerializer, BudgetSerializer, PocketSerializer, CategorySerializer

class TransactionsViewSet(viewsets.ModelViewSet):
    serializer_class = TransactionSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['title', 'debit', 'pocket__budget', 'id']

    def get_queryset(self):
        qs = Transaction.objects.all().filter(pocket__budget__user_list=self.request.user).order_by('date')
        budget_id = self.request.GET.get('budget_id', None)
        if budget_id is not None:
            qs = qs.filter(pocket__budget__id = self.request.GET['budget_id'])
        return qs

class BudgetsViewSet(viewsets.ModelViewSet):
    serializer_class = BudgetSerializer
    permission_classes = (permissions.IsAuthenticated, )

    def get_queryset(self):
        qs = Budget.objects.all().filter(user_list=self.request.user)
        return qs

class PocketViewSet(viewsets.ModelViewSet):
    serializer_class = PocketSerializer
    permission_classes = (permissions.IsAuthenticated, )
    def get_queryset(self):
            qs = Pocket.objects.all().filter(budget__user_list=self.request.user).order_by('id')
            return qs


class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    permission_classes = (permissions.IsAuthenticated, )

    def get_queryset(self):
        qs = Category.objects.all().filter(budget__user_list=self.request.user).order_by('id')
        return qs
