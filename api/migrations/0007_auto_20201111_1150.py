# Generated by Django 2.2.13 on 2020-11-11 17:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_auto_20201111_1143'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tickets',
            name='horasTrabajadas',
            field=models.DurationField(blank=True, null=True, verbose_name='HH:MM:SS'),
        ),
    ]