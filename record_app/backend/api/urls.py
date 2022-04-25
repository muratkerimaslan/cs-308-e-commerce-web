from django.urls import path
from . import views
from django.views.generic import TemplateView

urlpatterns = [
    #path('', views.front),
    path('', TemplateView.as_view(template_name='index.html')),
    path('users/', views.getUsers),
    path('users/create/', views.createUser),
    path('users/update/<str:pk>', views.updateUser),
    path('users/<str:pk>/delete', views.deleteUser),
    path('users/<str:pk>/', views.getUser),

    path('authenticate', views.authenticateUser),
    
    path('books/', views.getBooks),
    path('books/create/', views.createBook),
    path('books/update/<str:pk>', views.updateBook),
    path('books/<str:pk>/delete', views.deleteBook),
    path('books/<str:pk>/', views.getBook),

    path('searchBooks', views.searchBooks),
]