# Generated by Django 2.2.13 on 2020-11-16 15:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_auto_20201112_1601'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='idPuesto',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.Puestos'),
        ),
    ]