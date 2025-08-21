from rest_framework import serializers
from .models import Order, OrderItem
from products.serializers import ProductSerializer

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.name", read_only=True)
    product = ProductSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = ["id", "product", "product_name", "quantity", "price", "get_total_price"]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    customer_name = serializers.CharField(source="customer.username", read_only=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ["id", "customer", "customer_name", "status", "payment_status", "total_price", "created_at", "updated_at", "items"]
        read_only_fields = ["total_price"]

    def get_total_price(self, obj):
        """Always return recalculated total"""
        obj.update_total_price()
        return obj.total_price
