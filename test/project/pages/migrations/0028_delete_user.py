# Generated by Django 5.0.4 on 2024-06-24 20:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0027_delete_userdetails'),
    ]

    operations = [
        migrations.DeleteModel(
            name='User',
        ),
    ]
