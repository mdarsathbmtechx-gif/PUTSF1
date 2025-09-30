"""
WSGI config for putsf_backend project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/wsgi/
"""

import sys
import types

# Temporary cgi module stub for old Django
import builtins
sys.modules['cgi'] = types.ModuleType('cgi')

import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'putsf_backend.settings')
application = get_wsgi_application()
