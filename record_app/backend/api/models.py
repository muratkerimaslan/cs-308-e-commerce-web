from cgi import print_exception
from datetime import datetime
from email.policy import default
from tkinter import CASCADE
from unicodedata import category
from django.db import models
#from sympy import true

# Create your models here.

class Cart(models.Model):
    cart_id = models.AutoField(primary_key=True, auto_created=True)
    total = models.FloatField(default=0)
    total_revenue = models.FloatField(default=0)

    def __str__(self):
        return "Cart " + str(self.cart_id)

class Wishlist(models.Model):
    
    wishlist_id = models.AutoField(primary_key=True, auto_created=True)

    def __str__(self):
        return "Wishlist " + str(self.wishlist_id)

class User(models.Model):
    
    user_id = models.AutoField(primary_key=True, auto_created=True)
    name = models.TextField()
    password = models.TextField(default="1234")
    email = models.TextField(default="onbalikli@mail.com")
    cart = models.OneToOneField(Cart, on_delete=models.CASCADE, related_name="user")
    wishlist = models.OneToOneField(Wishlist, on_delete=models.CASCADE, related_name="user")

    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    
    #tax_id = models.TextField()

    def __str__(self):
        return self.name[0:50]

    class Meta:
        ordering = ['-updated']

class Author(models.Model):

    author_id = models.AutoField(primary_key=True, auto_created=True)
    name = models.TextField()
    #surname = models.TextField()
    def __str__(self):
        return self.name[0:50]


class Book(models.Model):

    book_id = models.AutoField(primary_key=True, auto_created=True)
    author_id = models.ForeignKey(Author, on_delete=models.CASCADE) #TEKRAR BAK
    title = models.TextField()
    genre = models.TextField()
    publisher = models.TextField()
    publisher_year = models.IntegerField()

    stock_amount = models.IntegerField(default=0)
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=0)
    #image = models.ImageField(upload_to='images/')   # uncomment this later on when you will add photos of the book
    image_link = models.TextField(default='')
    original_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    discount_rate = models.FloatField(default=1)
    in_stock = models.BooleanField(default=True)
    description = models.TextField(default='')
    arrival_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return self.title[0:50]

class Comment(models.Model):
    comment_id = models.AutoField(primary_key=True, auto_created=True)  #check this one if you need a explicit primary key for comments
    book_id = models.ForeignKey(Book, on_delete=models.CASCADE, related_name="comments")
    user_id = models.ForeignKey(User, on_delete=models.CASCADE) #check this one for multiple foreign keys
    comment = models.TextField()
    rating = models.DecimalField(max_digits=3, decimal_places=1)
    is_visible = models.BooleanField(default=False)
    #time_commented = models.DateTimeField() #commented out for future implementation

    def __str__(self):
        return self.comment[0:50]

class Cart_Item(models.Model):
    item_id = models.AutoField(primary_key=True, auto_created=True)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="cart_items")
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name="cart_items")
    original_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    discount_rate = models.FloatField(default=1)
    amount = models.IntegerField(default=1)
    arrival_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return "Cart Item" + str(self.item_id) + str(self.book.name)

class Wishlist_Item(models.Model):
    item_id = models.AutoField(primary_key=True, auto_created=True)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="wishlist_items")
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name="wishlist_items")

    def __str__(self):
        return "Wishlist Item" + str(self.item_id)

class Order(models.Model):
    order_id = models.AutoField(primary_key=True, auto_created=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE) #check this one for multiple foreign keys
    date = models.DateTimeField(auto_now=True)
    status = models.TextField(default='Processing')
    total = models.FloatField(default=0)
    total_revenue = models.FloatField(default=0)

    def __str__(self):
        return "Order" + str(self.order_id)

class Order_Item(models.Model):
    item_id = models.AutoField(primary_key=True, auto_created=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="order_items")
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name="order_items")
    original_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    discount_rate = models.FloatField(default=1)
    amount = models.IntegerField(default=1)
    arrival_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return "Order Item" + str(self.item_id) + str(self.book.name)