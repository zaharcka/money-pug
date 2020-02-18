from django.db import models
from django.contrib.auth.models import User

class Budget(models.Model):
  name = models.CharField(max_length=225)
  user_list = models.ManyToManyField(User)

  class Meta:
    verbose_name = "Бюджет"
    verbose_name_plural = "Бюджеты"

  def __str__(self):
    return self.name

class Pocket(models.Model):
  name = models.CharField(max_length=225)
  budget = models.ForeignKey('Budget', on_delete=models.CASCADE)
  class Meta:
      verbose_name = "Карман"
      verbose_name_plural = "Карманы"
  def __str__(self):
    return self.name

class Category(models.Model):
  name = models.CharField(max_length=225)
  budget = models.ForeignKey('Budget', on_delete=models.CASCADE)
  class Meta:
      verbose_name = "Категория"
      verbose_name_plural = "Категории"
  def __str__(self):
    return self.name


class Transaction(models.Model):
  title = models.CharField(max_length=225)
  description = models.CharField(max_length=225)
  category = models.ForeignKey('Category', on_delete=models.CASCADE)
  date = models.DateField()
  debit = models.IntegerField()
  credit = models.IntegerField()
  pocket = models.ForeignKey('Pocket', on_delete=models.CASCADE, null=True)

  class Meta:
      verbose_name = "Транзакция"
      verbose_name_plural = "Транзакции"
  def __str__(self):
    return self.title
