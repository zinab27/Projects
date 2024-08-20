from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse, JsonResponse
from .models import Book, User
# from django.contrib.auth import authenticate, login as auth_login
from django.contrib.auth.decorators import login_required
import json
from datetime import datetime
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout


def bookList(request):
    books = Book.objects.all()
    return render(request, 'pages/bookList.html', {'books': books})


def homepage(request):
    books = Book.objects.all()[:8]

    return render(request, 'pages/homepage.html', {'books' : books})
# Create your views here.

def book(request):
    return render(request, 'books/book.html', {'book': Book.objects.all()})  

# def books(request):
#     return render(request, 'books/book.html')

def signup(request):
    if(request.method == 'POST'):
        username=request.POST.get('username')
        password = request.POST.get('password')
        email = request.POST.get('email')
        isadmin = request.POST.get('check') == 'admin'
        user = User.objects.create_user(username=username, password=password, email=email, is_staff=isadmin, is_superuser=isadmin)
        user.save()
        return redirect('login')
    return render(request, 'pages/signup.html')


def check_email_username(request):
    email = request.GET.get('email')
    username = request.GET.get('username')

    email_exists = User.objects.filter(email=email).exists()
    username_exists = User.objects.filter(username=username).exists()

    return JsonResponse({'email_exists': email_exists, 'username_exists': username_exists})

# def login_view(request):
#     if request.method == 'POST':
#         username = request.POST.get('username')
#         password = request.POST.get('password')
#         user = authenticate(request, username=username, password=password)
#         if user is not None:
#             login(request, user)
#             return JsonResponse({'success': True})
#     return JsonResponse({'success': False})



# Updated check_user_existence view
# def check_user_existence(request):
#     data = json.loads(request.body)
#     username = data.get('username')
#     password = data.get('password')
#     print(data)
#     if UserDetails.objects.filter(username=username,password=password).exists():
#         return JsonResponse({'UsernameExists': True, 'PasswordExists': True})
#     elif UserDetails.objects.filter(username=username).exists():
#         return JsonResponse({'UsernameExists': True , 'PasswordExists': False})
#     return JsonResponse({'UsernameExists': False , 'PasswordExists': False})


def check_user_existence(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')
    user = authenticate(request, username=username, password=password)
    
    if user is not None:
        return JsonResponse({'UsernameExists': True, 'PasswordExists': True})
    elif User.objects.filter(username=username).exists():
        return JsonResponse({'UsernameExists': True, 'PasswordExists': False})
    return JsonResponse({'UsernameExists': False, 'PasswordExists': False})



# def check_user_existence(request):
#     username = request.GET.get('username')
#     password = request.GET.get('password')
#     user_exists = User.objects.filter(username=username, password=password).exists()
#     return JsonResponse({'exists': user_exists})


# def login(request):
#     if request.method=='POST':
#         username = request.POST.get('username')
#         user = User.objects.get(username=username)
#         user.is_login = True
#         user.save()
#         return redirect('books/homepage')
#     return render(request, 'pages/signin.html')


def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username') 
        password = request.POST.get('confirm-password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('homepage')
        else:
            print('false')
        
    return render(request, 'pages/signin.html')



# def admin(request):
#     return render(request, 'pages/admin.html')

def borrow(request):
    books = Book.objects.all()
    for book in books:
        print(book.available)
    categories = ['Fiction', 'Romance', 'Thriller', 'Fantasy', 'Kids', 'Horror']
    return render(request, 'pages/Borrow.html', {'books': books, 'categories': categories})



def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return redirect('homepage')  # Redirect to the homepage after logout
    return JsonResponse({'status': 'error'}, status=405)


def add_view(request):
    return render(request,'pages/add-new.html')

def addBook(request):
    # it works without any javascript , only by html
    if request.method == 'POST':
        bookid=request.POST.get('add')
        title = request.POST.get('title') #title is the same for name in input fields in html
        author= request.POST.get('author')
        genre = request.POST.get('genre')
        description = request.POST.get('description')
        published = request.POST.get('date')
        ISBN = request.POST.get('ISBN')
        price = request.POST.get('price')
        image= request.FILES.get('filename')
        print(title ,"    ", author , "    ", image,"    ", price, "    ",published,"    ",genre,"    ",description,"    ",ISBN)
        book = Book( bookId=bookid, title=title, image=image , price=price , author=author, genre=genre , ISBN=ISBN ,description=description, publisherDate=published, available=True)
        book.save()
        return JsonResponse({"message": "Book Added Successfully"})
    return render(request, 'pages/add-new.html')
    
    

def checkID(request):
    id = request.GET.get('id')
    print(id)

    id_exists = Book.objects.filter(bookId=id).exists()
    
    print(id_exists)

    return JsonResponse({'ID_exists': id_exists})


def update_book_view(request):
    if(request.method == 'POST'):
        book_id = int(request.POST.get('add'))
        title = request.POST.get('title')
        author = request.POST.get('author')
        genre = request.POST.get('genre')
        description = request.POST.get('description')
        published = request.POST.get('published')
        isbn = request.POST.get('ISBN')
        price = request.POST.get('price')
        photo = request.FILES.get('filename')
        
        print(photo,book_id," ",title ,"    ", author ,"    ", price, "    ",published,"    ",genre,"    ",description,"    ",isbn)
        
        book = Book.objects.get(bookId=book_id)
        #book.bookId = book_id
        book.title = title
        book.author = author
        book.genre = genre
        book.description = description
        # published = datetime.strptime(published_str, "%B %d, %Y").strftime("%Y-%m-%d")
        book.ISBN = isbn
        book.price = price
        if(photo!=None):
            book.image = photo
        book.save()
        return JsonResponse({'message': True})

    # Process the data as needed
    # For example, you can render a template with the form pre-filled with this data
    return JsonResponse({'message': False})
    
    
def admin(request):
    books = Book.objects.all()
    booksid=Book.objects.all().order_by('bookId')
    bookstitle=Book.objects.all().order_by('title')
    return render(request, 'pages/admin.html', {'books': books, 'orderid': booksid, 'ordertitle':bookstitle})

def delete_all_books(request):
    Book.objects.all().delete()
    
    return redirect('admin')

def delete_book(request, book_id):
    book = get_object_or_404(Book, pk=book_id)
    book.delete()
    return redirect('admin')

def bookDetail(request, title):
    if request.method == 'GET':
        # title_lower = title.lower()
        book = Book.objects.filter(title__iexact=title).first()
        
        # book = Book.objects.get(title=bk)
        # print(bk)
        print(book)
        if book:
            data = {
                    'title': book.title,
                    'author': book.author,
                    'category': book.genre,
                    'published': book.publisherDate,
                    'ISBN': book.ISBN,
                    'description': book.description,
                    'price': book.price,
                    'photo': book.image,
                    'available' : book.available
                }
        else:
            data = {'message': 'Book not found'}
        return render(request, 'pages/bookdetails.html', data)
            #return JsonResponse({'error': 'Book not found'})
    else:
        # Return an error response for unsupported request method
        return JsonResponse({'error': 'Method not allowed'},status=405)
    
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt  # Temporarily exempt from CSRF for testing purposes (not recommended for production)
def borrowBook(request):
    user = request.user
    if request.method == 'POST':
        data = json.loads(request.body)
        title = data.get('title')
        if title:
            try:
                book = Book.objects.get(title=title)
                book.borrowers.add(user)
                book.available = False
                book.save()
                print(book, book.available)
                return JsonResponse({"message": f"You have successfully borrowed {book.title}!"})
            except Book.DoesNotExist:
                return JsonResponse({"error": f"Book with title '{title}' does not exist."}, status=404)
        return JsonResponse({"error": "No book title provided."}, status=400)
    return JsonResponse({"error": "Invalid request method."}, status=405)


def borrowedBooks(request):
    user = request.user
    if user.is_authenticated:
        borrowed_books = Book.objects.filter(borrowers=user)
        return render(request, 'pages/borrowed-books.html', {'borrowed_books': borrowed_books})
    else:
        # Handle the case where the user is not authenticated
        return render(request, 'pages/borrowed-books.html', {'borrowed_books': []})

def returnBook(request):
    user = request.user
    if request.method == 'POST':
        data = json.loads(request.body)
        title = data.get('title')
        if title:
            try:
                book = Book.objects.get(title=title)
                book.borrowers.remove(user)
                book.available = True
                book.save()
                return JsonResponse({"message": f"You have successfully borrowed {book.title}!"})
            except Book.DoesNotExist:
                return JsonResponse({"error": f"Book with title '{title}' does not exist."}, status=404)
        return JsonResponse({"error": "No book title provided."}, status=400)
    return JsonResponse({"error": "Invalid request method."}, status=405)


def resetBooks(request):
    user = request.user
    if request.method == 'POST':
        data = json.loads(request.body)
        titles = data.get('titles')
        if titles:
            try:
                for title in titles:
                    book = Book.objects.get(title=title)
                    book.borrowers.remove(user)
                    book.available = True
                    book.save()
                return JsonResponse({"message": f"All books are returned successfully!"})
            except Book.DoesNotExist:
                return JsonResponse({"error": f"Book with title '{title}' does not exist."}, status=404)
        return JsonResponse({"error": "No book title provided."}, status=400)
    return JsonResponse({"error": "Invalid request method."}, status=405)



def search_books(request):
    if request.method == 'POST':
        query = request.POST.get('query', '')  # Trim whitespace from the query
        print(query)
        search_by = request.POST.get('search_by', 'all')  # Default is all

        if query:  # Ensure the query is not empty
            if search_by == 'title':
                books = Book.objects.filter(title__icontains=query)
            elif search_by == 'author':
                books = Book.objects.filter(author__icontains=query)
            elif search_by == 'category':
                books = Book.objects.filter(genre__icontains=query)
            else:  # | is 'or' in Django ORM
                books = Book.objects.filter(title__icontains=query) | Book.objects.filter(author__icontains=query) | Book.objects.filter(genre__icontains=query)
        else:
            books = Book.objects.all() 

        #print(books)

        books_data = [{'title': book.title, 'author': book.author, 'genre': book.genre} for book in books]
        
        print(books_data)
        return JsonResponse({'books': books_data})

    return JsonResponse({'error': 'Invalid request'})


def filterid(request):
    sort_by = request.GET.get('sort_by', 'bookId')  # Default sort by 'id'
    books = Book.objects.all().order_by('bookId')
    return render(request, 'pages/admin.html', {'books': books})