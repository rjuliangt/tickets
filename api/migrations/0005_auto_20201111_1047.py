# Generated by Django 2.2.13 on 2020-11-11 16:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20201109_1245'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tickets',
            name='horasTrabajadas',
            field=models.TimeField(blank=True, max_length=25, null=True),
        ),
    ]
