from django.urls import path
from . import views


urlpatterns = [
    #path('',views.index,name='index'),#name is the name of %url % used in dynamic pages
    path('homepage',views.homepage,name='homepage'),
    path('booklist',views.bookList,name='booklist'),
    # path('borrow/book_details/<str:title>/', views.bookDetail, name='book_detail'),
    #path('', views.homepage, name='homepage'),
    #path('homepage',views.homepage,name='homepage'),
    #path('',views.books,name='books'),
    path('book',views.book,name='book'),
    path('signup',views.signup,name='signup'),
    path('check/', views.check_email_username, name='check_email_username'),
    path('login',views.login_view,name='login'),
    # path('login/',views.login,name='login'),

    #path('login',views.login_view,name='login'),
    path('checker/', views.check_user_existence, name='check'),
    path('admin/', views.admin, name='admin'),
    path('borrow/', views.borrow, name='borrow'),
    path('logout/', views.logout_view, name='logout'),
    path('update_or_add_book/', views.add_view, name='update_or_add_book'),
    path('add_book/', views.addBook, name='add_book'),
    path('admin/add_book/', views.addBook, name='add_book'),
    path('add_book/checkid/', views.checkID, name='checkid'),
    path('admin/add_book/checkid/', views.checkID, name='checkid'),
    path('add_book/addBook/', views.addBook, name='addBook'),
    path('admin/add_book/addBook/', views.addBook, name='addBook'),

    path('add_book/admin/', views.admin),
    path('admin/add_book/update_book/', views.update_book_view, name='update_book'),

    # path('admin/update_book/', views.update_book_view, name='update_book'),
    path('delete_book/<int:book_id>/', views.delete_book, name='delete_book'),
    path('delete_all_books/', views.delete_all_books, name='delete_all_books'),

    path('borrow/book_details/<str:title>/', views.bookDetail, name='book_detail'),
    path('borrowBook/', views.borrowBook, name='borrow_book'), 
    path('borrowed-books/', views.borrowedBooks, name='borrowed-books'),
    path('borrowed-books/returnBook/', views.returnBook, name='return_book'),
    path('borrowed-books/resetBooks/', views.resetBooks, name='reset_books'),
    path('logout/', views.login_view, name='logout'),
    path('search/', views.search_books, name='search_books'),
    path('book_details/<str:title>/', views.bookDetail, name='book_detail'),
    path('filter/', views.filterid, name='filter'),

    ]

