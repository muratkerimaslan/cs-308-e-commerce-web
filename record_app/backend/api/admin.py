from django.contrib import admin

# Register your models here.

from .models import User, Book, Author, Comment, Cart, Cart_Item
admin.site.register(User)
admin.site.register(Book)
admin.site.register(Author)
admin.site.register(Comment)
admin.site.register(Cart)
admin.site.register(Cart_Item)

#admin.site.register(Writes)