# Generated by Django 2.2.13 on 2020-11-09 18:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_tickets_fechainicio'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tickets',
            name='horasTrabajadas',
            field=models.CharField(blank=True, max_length=25, null=True),
        ),
    ]
