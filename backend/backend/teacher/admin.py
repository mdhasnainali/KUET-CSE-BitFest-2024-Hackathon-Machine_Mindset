from django.contrib import admin
from teacher.models import Teacher, Content

@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    list_display = ("teacher", "name", "subject", "image_url")
    search_fields = ("teacher", "name", "subject")
    list_per_page = 10
    list_max_show_all = 100
    ordering = ("teacher",)
    readonly_fields = ("teacher",)
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "teacher",
                    "name",
                    "subject",
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
                    "teacher",
                    "name",
                    "subject",
                    "image_url",
                )
            },
        ),
    )
    actions = None
    save_as = True


@admin.register(Content)
class ContentAdmin(admin.ModelAdmin):
    list_display = ("title", "caption", "public", "bangla")
    