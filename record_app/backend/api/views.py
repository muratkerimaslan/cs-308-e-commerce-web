from pickle import TRUE
from turtle import isvisible
from urllib import response
from datetime import date, datetime
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from sympy import true
from decimal import Decimal

from .serializers import CommentSerializer, UserSerializer, BookSerializer, AuthorSerializer, CartSerializer, Cart_ItemSerializer, WishlistSerializer, Wishlist_ItemSerializer, OrderSerializer, Order_ItemSerializer
from .models import User, Book, Comment, Author, Cart, Cart_Item, Order, Order_Item, Wishlist, Wishlist_Item

# User view functions

@api_view(['GET']) 
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET']) 
def getUser(request, pk):
    user = User.objects.get(user_id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def createUser(request):
    data = request.data
    
    temp_user = User.objects.create(
        name = data['name'],
        password = data['password'] 
    )

    Cart.objects.create(
        user = temp_user
    )
    Wishlist.objects.create(
        user = temp_user
    )

    serializer = UserSerializer(temp_user, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
def updateUser(request, pk):
    user = User.objects.get(user_id=pk)
    data = request.data
    if data.get('name') is not None:
        user.name = data['name']
    
    if data.get('password') is not None:
        user.password = data['password']

    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteUser(request, pk):
    user = User.objects.get(user_id=pk)
    user.delete()
    return Response('User was deleted!')

@api_view(['POST'])
def authenticateUser(request):
    data = request.data
    
    is_authenticated = False

    if data.get('name'):
        user = User.objects.get(name=data['name'])
        
        if data.get('password') is not None and user.password == data.get('password'):
            is_authenticated = True
        else:
            print('Please enter a password')
    else:
        print("user doesn't exist")

    authenticate = [
        {
            'user_id' : user.user_id,
            'is_authenticated' : is_authenticated
        }
    ]
    return Response(authenticate)

@api_view(['GET'])
def searchBooks(request,pk):

    if pk is not None:
        books = Book.objects.filter(title__contains= pk)
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)
    else:
        response = [
            {
                'body' : 'Please enter valid book title'
            }
        ]
        return Response(response)

# Book view functions

@api_view(['GET']) 
def getBooks(request):
    books = Book.objects.all()
    serializer = BookSerializer(books, many=True)
    return Response(serializer.data)

@api_view(['GET']) 
def getBook(request, pk):
    book = Book.objects.get(book_id=pk)
    serializer = BookSerializer(book, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def createBook(request):
    data = request.data

    author_instance = Author.objects.get(author_id=data['author_id'])

    book = Book.objects.create(
        title = data['title'],
        author_id = author_instance, #TEKRAR BAK !! EVET TEKRAR BAK
        image_link = data['image_link'],
        genre = data['genre'],
        publisher = data['publisher'],
        publisher_year = data['publisher_year'],
        description = data['description'],
        original_price = data['price'],
        price = data['price'],
        arrival_price = data['arrival_price'] # Yeni Eklendi
    )

    if data.get('in_stock') is not None:
        book.in_stock = data['in_stock']

    if data.get('stock_amount') is not None:
        book.stock_amount = data['stock_amount']

    if data.get('discount_rate') is not None:
        book.discount_rate = data['discount_rate']

    book.save()
    serializer = BookSerializer(book, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
def updateBook(request, pk):
    book = Book.objects.get(book_id=pk)
    data = request.data
    if data.get('title') is not None:
        book.title = data['title']

    if data.get('author_id') is not None:
        author_instance = Author.objects.get(author_id=data['author_id'])
        book.author_id = author_instance

    if data.get('genre') is not None:
        book.genre = data['genre']

    if data.get('publisher') is not None:
        book.publisher = data['publisher']

    if data.get('publisher_year') is not None:
        book.publisher_year = data['publisher_year']

    if data.get('description') is not None:
        book.description = data['description']

    if data.get('price') is not None:
        book.price = data['price']

    if data.get('stock_amount') is not None:
        book.stock_amount = data['stock_amount']

    if data.get('in_stock') is not None:
        book.in_stock = data['in_stock']

    if data.get('rating') is not None:
        book.rating = data['rating']
        
    if data.get('image_link') is not None:
        book.image_link = data['image_link']
    
    if data.get('arrival_price') is not None:
        book.arrival_price = data['arrival_price']

    if data.get('discount_rate') is not None:
        book.discount_rate = data['discount_rate']
    
    book.price = book.original_price * Decimal.from_float(book.discount_rate)
    #print(book.price * book.discount_rate)
    print(book.price * book.original_price)
    book.save()
    serializer = BookSerializer(book, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteBook(request, pk):
    book = Book.objects.get(book_id=pk)
    book.delete()
    return Response('Book has been deleted!')

# Cart view functions

# Primary key of User is needed
@api_view(['GET'])
def getCartItems(request, pk):
    cart = User.objects.get(user_id=pk).cart
    cart_items = cart.cart_items.all()
    serializer = Cart_ItemSerializer(cart_items, many=True)
    return Response(serializer.data)

# Primary key of Cart_Item is needed
@api_view(['GET'])
def getCartItem(request, b_pk, u_pk):
    #cart = Cart.objects.get(user_id=pk1)
    book = Book.objects.get(book_id = b_pk)
    cart_items = book.cart_items.all()
    i_pk = 0
    for item in cart_items.iterator():
        if item.cart.user.user_id == u_pk:
            i_pk = item.item_id
    cart_item = Cart_Item.objects.get(item_id=i_pk)
    serializer = Cart_ItemSerializer(cart_item, many=False)
    return Response(serializer.data)

# Primary key of User is needed
@api_view(['POST'])
def addCartItem(request, pk):
    temp_cart = User.objects.get(user_id=pk).cart
    data = request.data
    temp_book = Book.objects.get(book_id=data['book_id'])

    # Amount check (check amount <= stock_amount)
    if temp_book.stock_amount < data['amount']:
        response = [
                {
                    'body' : 'Please enter a valid amount'
                }
            ]
        return Response(response)
    else:
        cart_item = Cart_Item.objects.create(
            cart = temp_cart,
            book = temp_book,
            amount = data['amount'],
            price = temp_book.price * data['amount'],
            revenue = (temp_book.price - temp_book.arrival_price) * data['amount']
        )
        temp_cart.total_revenue += cart_item.revenue
        temp_cart.total += temp_book.price * cart_item.amount
        temp_cart.save()
        serializer = Cart_ItemSerializer(cart_item, many=False)
        return Response(serializer.data)

# Primary key of Cart_Item is needed
# Primary key of Book is needed
@api_view(['DELETE'])
def deleteCartItem(request, b_pk, u_pk):
    user = User.objects.get(user_id = u_pk)
    cart_items = user.cart.cart_items.all()
    book = Book.objects.get(book_id = b_pk)
    #cart_items = book.cart_items.all()
    i_pk = 0
    for item in cart_items.iterator():
        if item.book == book:
            i_pk = item.item_id
    item = Cart_Item.objects.get(item_id=i_pk)

    user.cart.total -= item.price
    user.cart.total_revenue -= item.revenue
    user.cart.save()

    item.delete()
    return Response('Cart Item was deleted!')

# Primary key of Cart_Item is needed
# Primary key of Book is needed
@api_view(['PUT'])
def updateCartItem(request, b_pk, u_pk):
    user = User.objects.get(user_id = u_pk)
    cart_items = user.cart.cart_items.all()
    book = Book.objects.get(book_id = b_pk)
    #cart_items = book.cart_items.all()
    i_pk = 0
    for item in cart_items.iterator():
        if item.book == book:
            i_pk = item.item_id
    item = Cart_Item.objects.get(item_id=i_pk)
    data = request.data
    # Amount check (check amount <= stock_amount)
    if data.get('amount') is not None:
        if item.book.stock_amount < data['amount']:
            response = [
                {
                    'body' : 'Please enter a valid amount'
                }
            ]
            return Response(response)
        else:
            user.cart.total -= item.price
            user.cart.revenue -= item.revenue

            item.revenue = (item.book.price - item.book.arrival_price) * data['amount']
            item.amount = data['amount']
            item.price = item.book.price * item.amount
            item.save()

            user.cart.total += item.price
            user.cart.revenue += item.revenue
            user.cart.save()

    serializer = Cart_ItemSerializer(item, many=False)
    return Response(serializer.data)

# Checkout function
@api_view(['GET'])
def checkout(request, pk):
    temp_user = User.objects.get(user_id = pk)
    cart = Cart.objects.get(user=temp_user)
    cart_items = cart.cart_items.all()
    # The `iterator()` method ensures only a few rows are fetched from
    # the database at a time, saving memory.
    enough_in_stock = True
    for item in cart_items.iterator():
        if item.book.stock_amount < item.amount:
            enough_in_stock = False
    
    if enough_in_stock:
        temp_order = Order.objects.create(
            user = temp_user
        )

        for item in cart_items.iterator():
            item.book.stock_amount -= item.amount

            order_item = Order_Item.objects.create(
                order = temp_order,
                book = item.book,
                price = item.price,
                amount = item.amount,
                revenue = item.revenue
            )

            item.book.save()
            item.delete()

            temp_order.total_revenue += order_item.revenue
            temp_order.total += order_item.price
        
        temp_order.save()
        cart.total = 0
        cart.total_revenue = 0
        cart.save()

        response = [
            {
                'body' : 'Checkout succesfull !'
            }
        ]
    else:
        response = [
            {
                'body' : 'Checkout unsuccesfull'
            }
        ]
    return Response(response)


# Refund Function
# Needs order_id as pk
@api_view(['GET'])
def refund(request, pk):
    order = Order.objects.get(order_id=pk)

    if order.status == "Refund Requested": 
        order_items = order.order_items.all()

        for item in order_items.iterator():
            if (item.book.stock_amount == 0):
                item.book.in_stock = True
            item.book.stock_amount += item.amount
            item.book.save()

        order.status = "Refunded"
        order.save()

        response = [
            {
                'body' : 'Refund succesfull !'
            }
        ]
    
    else:
        response = [
            {
                'body' : 'Order not applicaple for refund, refund unsuccesfull !'
            }
        ]

    return Response(response)

# Wishlist view functions

# Primary key of User is needed
@api_view(['GET'])
def getWishlistItems(request, pk):
    temp_user = User.objects.get(user_id = pk)
    wishlist = Wishlist.objects.get(user=temp_user)
    wishlist_items = wishlist.wishlist_items.all()
    serializer = Wishlist_ItemSerializer(wishlist_items, many=True)
    return Response(serializer.data)

# Primary key of Book and
# Primary key of User is needed
@api_view(['GET'])
def getWishlistItem(request, b_pk, u_pk):
    temp_user = User.objects.get(user_id = u_pk)
    temp_wishlist = Wishlist.objects.get(user = temp_user)
    temp_book = Book.objects.get(book_id = b_pk)
    wishlist_item = Wishlist_Item.objects.filter(book = temp_book, wishlist = temp_wishlist)
    wishlist_serializer = Wishlist_ItemSerializer(wishlist_item, many=True)
    #book_serializer = BookSerializer(temp_book, many=False)
    #response = wishlist_serializer.data | book_serializer.data
    return Response(wishlist_serializer.data)

# Primary key of User is needed
@api_view(['POST'])
def addWishlistItem(request, pk):
    temp_user = User.objects.get(user_id = pk)
    temp_wishlist = Wishlist.objects.get(user=temp_user)
    data = request.data
    temp_book = Book.objects.get(book_id=data['book_id'])

    wishlist_item = Wishlist_Item.objects.create(
        wishlist = temp_wishlist,
        book = temp_book
    )
    serializer = Wishlist_ItemSerializer(wishlist_item, many=False)
    return Response(serializer.data)

# Primary key of Book and
# Primary key of User is needed
@api_view(['DELETE'])
def deleteWishlistItem(request, b_pk, u_pk):
    temp_user = User.objects.get(user_id = u_pk)
    temp_wishlist = Wishlist.objects.get(user = temp_user)
    temp_book = Book.objects.get(book_id = b_pk)
    wishlist_item = Wishlist_Item.objects.filter(book = temp_book, wishlist = temp_wishlist)
    wishlist_item.delete()
    return Response('Wishlist Item was deleted!')

# No update function for wishlist item, wasn't meaningful

# Comment view functions

#give all comments
@api_view(['GET'])
def getComments(request, pk):
    comments = Comment.objects.filter(book_id = pk, is_visible = True)
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)

#publish a new comment
@api_view(['POST'])
def createComment(request):
    data = request.data

    book_instance = Book.objects.get(book_id=data['book_id'])
    user_instance = User.objects.get(user_id=data['user_id'])

    comment = Comment.objects.create(
        book_id = book_instance,
        user_id = user_instance,
        comment = data['comment'],
        rating = data['rating'],
        #time_commented = models.DateTimeField() #commented out for future implementation
    )
    
    #book_instance.rating = (float(book_instance.rating * comment_amount) + comment.rating) / (comment_amount + 1)
    #book_instance.save()
    serializer = CommentSerializer(comment, many=False)
    return Response(serializer.data)


# --- For product manager ---
#change visibility
@api_view(['PUT'])
def updateVisibility(request,pk):
    comment = Comment.objects.get(comment_id = pk)
    comment.is_visible = True

    book_instance = Book.objects.get(book_id=comment.book_id.book_id)
    comment_amount = len(Comment.objects.filter(book_id = pk, is_visible = True))
    book_instance.rating = (float(book_instance.rating * comment_amount) + float(comment.rating)) / (comment_amount + 1)
    print(f"book istance rating  = {book_instance.rating}" )
    book_instance.save()
    comment.save()

    #if it doesn't work, return string instead
    serializer = CommentSerializer(comment, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getInvisibleComments(request):
    comments = Comment.objects.filter(is_visible = False)
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)

# --- ------------------- ---



# --- Author Functions ---
@api_view(['POST'])
def createAuthor(request):
    data = request.data
    author = Author.objects.create(
        name = data['name']
    )
    serializer = AuthorSerializer(author, many=False)
    return Response(serializer.data)
    
@api_view(['DELETE'])
def deleteAuthor(request,pk):
    author = Author.objects.get(author_id=pk)
    author.delete()
    return Response('Author has been deleted!')

@api_view(['GET'])
def getAuthor(request,pk):
    author = Author.objects.get(author_id=pk)
    serializer = AuthorSerializer(author, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def updateAuthor(request,pk):
    author = Author.objects.get(author_id=pk)
    data = request.data
    if data.get('name') is not None:
        author.name = data['name']
    
    author.save()
    serializer = AuthorSerializer(author, many=False)
    return Response(serializer.data)

# Filter books by genre
@api_view(['GET'])
def getBooksByGenre(request,pk):
    books = Book.objects.filter(genre = pk)
    serializer = BookSerializer(books, many=True)
    return Response(serializer.data)
#time commented


#rating girme

#pm visibility changer



# Sales Manager Functions

# price update

# discount 

# gets all the orders of one user
#   cart = User.objects.get(user_id=pk).cart
#     cart_items = cart.cart_items.all()

    # temp_user = User.objects.get(user_id = pk)
    # wishlist = Wishlist.objects.get(user=temp_user)
    # #temp_user = User.objects.get(user_id = pk)
    #Order.objects.get(user_id=pk)
@api_view(['GET']) 
def getOrders(request, pk):    
    orders = Order.objects.filter(user_id=pk)
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)
    #return Response(4);

# get all the orders within 30 days
@api_view(['GET']) 
def getOrder30(request):
    current_time = datetime.now()
    orders = Order.objects.filter(date - current_time < 30)
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

# update order
@api_view(['POST'])
def updateOrderStatus(request, pk):
    order = Order.objects.get(order_id=pk)
    data = request.data
    if data.get('status') is not None:
        order.status = data['status']
    
    order.save()
    serializer = AuthorSerializer(order, many=False)
    return Response(serializer.data)

# -----------------------

@api_view(['GET']) 
def getRevenueByDate(request, pk):
    input_days = int(pk)
    today = datetime.date.today()
    until_date = today - datetime.timedelta(days=input_days)
    orders = Order.objects.filter(entered__gte=until_date)
    interval_revenue = 0

    for order in orders.iterator():
        interval_revenue += order.total_revenue

    response = [
            {
                'interval_revenue' : interval_revenue
            }
        ]


    return Response(response)