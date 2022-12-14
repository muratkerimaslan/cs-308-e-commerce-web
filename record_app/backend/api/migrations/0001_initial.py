# Generated by Django 4.0 on 2022-06-23 09:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Author',
            fields=[
                ('author_id', models.AutoField(auto_created=True, primary_key=True, serialize=False)),
                ('name', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Book',
            fields=[
                ('book_id', models.AutoField(auto_created=True, primary_key=True, serialize=False)),
                ('title', models.TextField()),
                ('genre', models.TextField()),
                ('publisher', models.TextField()),
                ('publisher_year', models.IntegerField()),
                ('stock_amount', models.IntegerField(default=0)),
                ('rating', models.DecimalField(decimal_places=1, default=0, max_digits=3)),
                ('image_link', models.TextField(default='')),
                ('original_price', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('price', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('discount_rate', models.FloatField(default=1)),
                ('in_stock', models.BooleanField(default=True)),
                ('description', models.TextField(default='')),
                ('arrival_price', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('author_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.author')),
            ],
        ),
        migrations.CreateModel(
            name='Cart',
            fields=[
                ('cart_id', models.AutoField(auto_created=True, primary_key=True, serialize=False)),
                ('total', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('total_revenue', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('order_id', models.AutoField(auto_created=True, primary_key=True, serialize=False)),
                ('date', models.DateTimeField(auto_now=True)),
                ('status', models.TextField(default='Processing')),
                ('total', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('total_revenue', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('user_id', models.AutoField(auto_created=True, primary_key=True, serialize=False)),
                ('name', models.TextField()),
                ('password', models.TextField(default='1234')),
                ('email', models.TextField(default='onbalikli@mail.com')),
                ('updated', models.DateTimeField(auto_now=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ['-updated'],
            },
        ),
        migrations.CreateModel(
            name='Wishlist',
            fields=[
                ('wishlist_id', models.AutoField(auto_created=True, primary_key=True, serialize=False)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='wishlist', to='api.user')),
            ],
        ),
        migrations.CreateModel(
            name='Wishlist_Item',
            fields=[
                ('item_id', models.AutoField(auto_created=True, primary_key=True, serialize=False)),
                ('book', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='wishlist_items', to='api.book')),
                ('wishlist', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='wishlist_items', to='api.wishlist')),
            ],
        ),
        migrations.CreateModel(
            name='Order_Item',
            fields=[
                ('item_id', models.AutoField(auto_created=True, primary_key=True, serialize=False)),
                ('price', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('amount', models.IntegerField(default=1)),
                ('revenue', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('book', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='order_items', to='api.book')),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='order_items', to='api.order')),
            ],
        ),
        migrations.AddField(
            model_name='order',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.user'),
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('comment_id', models.AutoField(auto_created=True, primary_key=True, serialize=False)),
                ('comment', models.TextField()),
                ('rating', models.DecimalField(decimal_places=1, max_digits=3)),
                ('is_visible', models.BooleanField(default=False)),
                ('book_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='api.book')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.user')),
            ],
        ),
        migrations.CreateModel(
            name='Cart_Item',
            fields=[
                ('item_id', models.AutoField(auto_created=True, primary_key=True, serialize=False)),
                ('amount', models.IntegerField(default=1)),
                ('price', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('revenue', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('book', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cart_items', to='api.book')),
                ('cart', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cart_items', to='api.cart')),
            ],
        ),
        migrations.AddField(
            model_name='cart',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='cart', to='api.user'),
        ),
    ]
