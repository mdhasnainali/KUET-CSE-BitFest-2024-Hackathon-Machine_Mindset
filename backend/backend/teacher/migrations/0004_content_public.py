# Generated by Django 4.2.6 on 2025-01-03 08:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("teacher", "0003_alter_content_bangla_alter_content_caption_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="content",
            name="public",
            field=models.BooleanField(default=False),
        ),
    ]
