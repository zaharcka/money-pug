from django.contrib import admin
from .models import Transaction, Category, Pocket, Budget

admin.site.register(Transaction)
admin.site.register(Category)
admin.site.register(Pocket)
admin.site.register(Budget)


# Register your models here.
