from django.contrib import admin
from student.models import Student


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ("student", "name", "roll", "level", "image_url")
    search_fields = ("student", "name", "roll", "level")
    list_per_page = 10
    list_max_show_all = 100
    ordering = ("student",)
    readonly_fields = ("student",)
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "student",
                    "name",
                    "roll",
                    "level",
                    "image_url",
                )
            },
        ),
    )
    add_fieldsets = (
        (
            None,
            {
                "fields": (
                    "student",
                    "name",
                    "roll",
                    "level",
                    "image_url",
                )
            },
        ),
    )
    actions = None
    save_as = True
