from turtle import isvisible
from urllib import response
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import CommentSerializer, UserSerializer, BookSerializer, AuthorSerializer, CartSerializer, Cart_ItemSerializer
from .models import User, Book, Comment, Author, Cart, Cart_Item
#from record_app.backend.api import serializers

@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint' : '/users/',
            'method' : 'GET',
            'body' : 'None',
            'description' : 'Returns an array of users'
        },
        {
            'Endpoint' : '/users/id',
            'method' : 'GET',
            'body' : 'None',
            'description' : 'Returns a single user'
        },
        {
            'Endpoint' : '/users/create',
            'method' : 'POST',
            'body' : {'body' : ""},
            'description' : 'Creates a new user with data sent from the request'
        },
        {
            'Endpoint' : '/users/id/update',
            'method' : 'PUT',
            'body' : {'body' : ""},
            'description' : 'Creates an existing user with data sent from the request'
        },
        {
            'Endpoint' : '/users/id/delete',
            'method' : 'DELETE',
            'body' : "None",
            'description' : 'Deletes an existing user with the given id'
        }
    ]
    return Response(routes)

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
    
    user = User.objects.create(
        name = data['name'],
        password = data['password'],
        cart = Cart.objects.create()
    )
    serializer = UserSerializer(user, many=False)
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
        price = data['price'],
    )

    if data.get('in_stock') is not None:
        book.in_stock = data['in_stock']

    if data.get('stock_amount') is not None:
        book.stock_amount = data['stock_amount']

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

    book.save()
    serializer = BookSerializer(book, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteBook(request, pk):
    book = Book.objects.get(book_id=pk)
    book.delete()
    return Response('Book has been deleted!')

'''
def front(request):
    context = { }
    return render(request, "index.html", context)'''

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
            price = temp_book.price * data['amount']
        )
        temp_cart.total += float(temp_book.price * temp_book.stock_amount)
        temp_cart.save()
        serializer = Cart_ItemSerializer(cart_item, many=False)
        return Response(serializer.data)


'''{
    "item_id": 3,
    "price": "2250.00",
    "amount": 150,
    "cart_id": 1,
    "book": 2
}'''

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
            item.amount = data['amount']
            item.price = item.book.price * item.amount
            item.save()

    serializer = Cart_ItemSerializer(item, many=False)
    return Response(serializer.data)

# Checkout function
@api_view(['GET'])
def checkout(request, pk):
    cart = User.objects.get(user_id=pk).cart
    cart_items = cart.cart_items.all()
    # The `iterator()` method ensures only a few rows are fetched from
    # the database at a time, saving memory.
    enough_in_stock = True
    for item in cart_items.iterator():
        if item.book.stock_amount < item.amount:
            enough_in_stock = False
    
    if enough_in_stock:
        for item in cart_items.iterator():
            item.book.stock_amount -= item.amount
            item.book.save()
            item.delete()

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
        #is_visible = data['is_visible']
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

    book_instance = Book.objects.get(book_id=comment.book_id)
    comment_amount = len(book_instance.comments.all())
    book_instance.rating = (float(book_instance.rating * comment_amount) + comment.rating) / (comment_amount + 1)
    
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