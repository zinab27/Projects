import datetime
from django.db import models
from django.conf import settings

# Create your models here.


class Book(models.Model):
    title = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    author = models.CharField(max_length=50)
    image= models.ImageField(upload_to= 'pics/' )
    genre= models.CharField(max_length=50)
    description= models.TextField(max_length=2000)
    publisherDate= models.DateField(default=datetime.datetime.now)
    ISBN= models.TextField(max_length=12)
    borrowers = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='borrowed_books')
    available = models.BooleanField()
    bookId=models.IntegerField(unique=True,null=True)
    def __str__(self):#change default name in page admin interface
        return self.title
    


    
