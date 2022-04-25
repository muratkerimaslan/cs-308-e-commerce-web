from tkinter import CASCADE
from django.db import models
#from sympy import true

# Create your models here.

class User(models.Model):
    
    user_id = models.AutoField(primary_key=True, auto_created=True)
    name = models.TextField()
    password = models.TextField(default="1234")

    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name[0:50]

    class Meta:
        ordering = ['-updated']

class Author(models.Model):

    author_id = models.AutoField(primary_key=True, auto_created=True)
    name = models.TextField()
    #surname = models.TextField()

class Book(models.Model):

    book_id = models.AutoField(primary_key=True, auto_created=True)
    author_id = models.ForeignKey(Author, on_delete=models.CASCADE)
    title = models.TextField()
    genre = models.TextField()
    publisher = models.TextField()
    publisher_year = models.IntegerField()

'''class Writes(models.Model):
    writes_id = models.AutoField(primary_key=True, auto_created=True)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)'''