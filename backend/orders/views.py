from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Order, OrderItem
from .serializers import OrderSerializer, OrderItemSerializer
from products.models import Product

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by("-created_at")
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        """Set logged-in user as customer"""
        serializer.save(customer=self.request.user)

    def create(self, request, *args, **kwargs):
        """Allow creating an order with items in one request"""
        items_data = request.data.pop("items", [])
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        order = serializer.save(customer=request.user)

        # Create order items
        for item in items_data:
            product_id = item.get("product")
            quantity = item.get("quantity", 1)
            try:
                product = Product.objects.get(id=product_id)
            except Product.DoesNotExist:
                return Response({"error": f"Product {product_id} not found"}, status=400)

            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=quantity,
                price=product.price
            )

        order.update_total_price()
        return Response(self.get_serializer(order).data, status=status.HTTP_201_CREATED)
