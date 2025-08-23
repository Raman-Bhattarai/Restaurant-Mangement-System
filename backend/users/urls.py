from django.urls import path
from .views import RegisterView, LoginView, LogoutView, CustomerListView, StaffListView, current_user

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("users/customers/", CustomerListView.as_view(), name="customer-list"),
    path("users/staff/", StaffListView.as_view(), name="staff-list"),
    path("user/me/", current_user, name="current-user"),
]
