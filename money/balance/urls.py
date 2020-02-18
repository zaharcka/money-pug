from rest_framework.routers import DefaultRouter
from django.conf.urls import include, url

from .views import TransactionsViewSet, BudgetsViewSet, PocketViewSet, CategoryViewSet

router = DefaultRouter()
router.register(r'transactions', TransactionsViewSet, basename='transactions')
router.register(r'budgets', BudgetsViewSet, basename='budgets')
router.register(r'pockets', PocketViewSet, basename='pockets')
router.register(r'category', CategoryViewSet, basename='categories')

urlpatterns = router.urls

