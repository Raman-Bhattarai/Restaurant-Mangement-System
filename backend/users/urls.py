from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from .views import RegisterView, LoginView, LogoutView, CustomerListView, StaffListView, current_user

urlpatterns = [
    # Auth
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),  # custom login
    path("logout/", LogoutView.as_view(), name="logout"),
    path("user/me/", current_user, name="current-user"),

    # JWT built-in endpoints (recommended)
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("token/verify/", TokenVerifyView.as_view(), name="token_verify"),

    # Admin-only user lists
    path("users/customers/", CustomerListView.as_view(), name="customer-list"),
    path("users/staff/", StaffListView.as_view(), name="staff-list"),
]
