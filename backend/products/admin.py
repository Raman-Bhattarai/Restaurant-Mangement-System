from django.contrib import admin
from .models import Product, Category
from django.contrib.admin import ModelAdmin

@admin.register(Product)
class ProductAdmin(ModelAdmin):
    # Fields to display in admin list view
    list_display = ("name", "price", "category", "is_available")
    search_fields = ("name", "category__name")
    list_filter = ("category", "is_available")

    # Fieldsets for detail/edit page in admin
    fieldsets = (
        (None, {"fields": ("name", "description", "price", "category", "is_available")}),
    )
    # Fields for "Add new product" form in admin
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("name", "description", "price", "category", "is_available"),
        }),
    )

@admin.register(Category)
class CategoryAdmin(ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)
    fieldsets = (
        (None, {"fields": ("name","image")}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("name", "image"),
        }),
    )