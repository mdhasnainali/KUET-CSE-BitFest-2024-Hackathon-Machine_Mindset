# Generated by Django 4.2.6 on 2025-01-03 13:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("teacher", "0005_alter_content_pdf_file"),
    ]

    operations = [
        migrations.AlterField(
            model_name="content",
            name="pdf_file",
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]