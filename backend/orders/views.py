from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Order, OrderItem
from .serializers import OrderSerializer
from products.models import Product
from rest_framework.decorators import action

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by("-created_at")
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        """Create order with items in one request"""
        items_data = request.data.pop("items", [])
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Automatically assign logged-in user as customer
        order = serializer.save(customer=request.user)

        # Create order items
        for item in items_data:
            product_id = item.get("product")
            quantity = item.get("quantity", 1)
            try:
                product = Product.objects.get(id=product_id)
            except Product.DoesNotExist:
                return Response(
                    {"error": f"Product {product_id} not found"}, status=400
                )

            OrderItem.objects.create(
                order=order, product=product, quantity=quantity, price=product.price
            )

        order.update_total_price()
        return Response(self.get_serializer(order).data, status=status.HTTP_201_CREATED)
    
    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def cancel(self, request, pk=None):
        order = self.get_object()

        # Only allow cancelling if not already cancelled
        if order.status != "cancelled":
            order.status = "cancelled"
            order.save()

        return Response(self.get_serializer(order).data)
