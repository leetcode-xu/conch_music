# -*- coding: utf-8 -*-
# Generated by Django 1.11.8 on 2018-10-22 12:59
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('discover', '0004_auto_20181022_1258'),
    ]

    operations = [
        migrations.AddField(
            model_name='musiclist',
            name='length_name',
            field=models.CharField(default=1, max_length=5),
            preserve_default=False,
        ),
    ]