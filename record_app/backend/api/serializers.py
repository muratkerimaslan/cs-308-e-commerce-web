from rest_framework.serializers import ModelSerializer
from .models import Author, User, Book, Comment, Cart, Cart_Item, Order, Order_Item

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class BookSerializer(ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class AuthorSerializer(ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'

class CommentSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class CartSerializer(ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'

class Cart_ItemSerializer(ModelSerializer):
    class Meta:
        model = Cart_Item
        fields = '__all__'

class OrderSerializer(ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class Order_ItemSerializer(ModelSerializer):
    class Meta:
        model = Order_Item
        fields = '__all__'
