# Generated by Django 4.2.6 on 2025-01-03 20:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("administrator", "0002_contribution"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="contribution",
            name="approved",
        ),
    ]
