from django.contrib import admin
from administrator.models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("username", "email", "is_student", "is_teacher", "is_admin")
    search_fields = ("username", "email")
    list_per_page = 10
    list_max_show_all = 100
    ordering = ("username",)
    readonly_fields = ("username",)
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "username",
                    "email",
                    "is_student",
                    "is_teacher",
                    "is_admin",
                )
            },
        ),
    )
    add_fieldsets = (
        (
            None,
            {
                "fields": (
                    "username",
                    "email",
                    "is_student",
                    "is_teacher",
                    "is_admin",
                )
            },
        ),
    )
    actions = None
    save_as = True
