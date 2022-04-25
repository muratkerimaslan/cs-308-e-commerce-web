from urllib import response
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer, BookSerializer
from .models import User, Book

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
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def createUser(request):
    data = request.data
    
    user = User.objects.create(
        name = data['name'],
        password = data['password']
    )
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
def updateUser(request, pk):
    user = User.objects.get(id=pk)
    data = request.data
    if data.get('name') is not None:
        user.name = data['name']
    
    if data.get('password') is not None:
        user.password = data['password']

    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteUser(request, pk):
    user = User.objects.get(id=pk)
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
            'is_authenticated' : is_authenticated
        }
    ]
    return Response(authenticate)

@api_view(['POST'])
def searchBooks(request):
    data = request.data

    if data.get('title') is not None:
        books = Book.objects.filter(title__contains= data.get('title'))
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
    book = Book.objects.get(id=pk)
    serializer = BookSerializer(book, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def createBook(request):
    data = request.data
    
    book = Book.objects.create(
        title = data['title'],
        author = data['author'],
        genre = data['genre'],
        publisher = data['publisher'],
        publisher_year = data['publisher_year']
    )
    serializer = BookSerializer(book, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
def updateBook(request, pk):
    book = Book.objects.get(id=pk)
    data = request.data
    if data.get('title') is not None:
        book.title = data['title']
    
    if data.get('author') is not None:
        book.author = data['author']

    if data.get('genre') is not None:
        book.genre = data['genre']

    if data.get('publisher') is not None:
        book.publisher = data['publisher']

    if data.get('publisher_year') is not None:
        book.publisher_year = data['publisher_year']

    serializer = BookSerializer(book, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteBook(request, pk):
    book = Book.objects.get(id=pk)
    book.delete()
    return Response('Book was deleted!')

'''
def front(request):
    context = { }
    return render(request, "index.html", context)'''