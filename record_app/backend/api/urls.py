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

    path('searchBooks/<str:pk>/', views.searchBooks),
    
    #create author
    path('authors/create/', views.createAuthor),  
    #delete author
    path('authors/<str:pk>/delete', views.deleteAuthor),
    #get author
    path('authors/<str:pk>/', views.getAuthor),
    #update author
    path('authors/update/<str:pk>', views.updateAuthor),

    path('getCartItems/<str:pk>/', views.getCartItems),
    path('addCartItem/<str:pk>', views.addCartItem),
    path('deleteCartItem/<str:b_pk>/<str:u_pk>', views.deleteCartItem),
    path('updateCartItem/<str:b_pk>/<str:u_pk>', views.updateCartItem),
    path('checkout/<str:pk>', views.checkout),
    path('refund/<str:pk>', views.refund),


    path('getWishlistItems/<str:pk>/', views.getWishlistItems),
    path('getWishlistItem/<str:b_pk>/<str:u_pk>', views.getWishlistItem),
    path('addWishlistItem/<str:pk>', views.addWishlistItem),
    path('deleteWishlistItem/<str:b_pk>/<str:u_pk>', views.deleteWishlistItem),
    #path('updateWishlistItem/<str:b_pk>/<str:u_pk>', views.updateWishlistItem),

    #getInvisibleComments
    path('comments/', views.getInvisibleComments),

    #getComments
    path('comments/<str:pk>/', views.getComments),

    #updateVisibility
    path('comments/update/<str:pk>/', views.updateVisibility),

    #makeComment
    path('comments/create', views.createComment),

    #getBooksByGenre
    path('getBooksByGenre/<str:pk>/', views.getBooksByGenre),

    path('getOrders/<str:pk>/', views.getOrders),
    path('getOrder30/<str:pk>/', views.getOrder30),

    path('updateOrderStatus/<str:pk>', views.updateOrderStatus),
    path('getRevenueByDate/<str:pk>', views.getRevenueByDate)
]