from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import License
from .serializers import LicenseSerializer

class LicenseViewSet(viewsets.ModelViewSet):
    queryset = License.objects.all().order_by("-created_at")
    serializer_class = LicenseSerializer

    @action(detail=True, methods=["post"])
    def approve(self, request, pk=None):
        license_obj = self.get_object()
        license_obj.is_approved = True
        license_obj.save()
        return Response({"message": "License approved successfully!"})

from django.http import JsonResponse, HttpResponse
from django.template.loader import render_to_string
from weasyprint import HTML

from rest_framework.decorators import api_view

@api_view(["GET"])
def download_license(request):
    phone = request.GET.get("phone")
    try:
        license_obj = License.objects.get(phone=phone, is_approved=True)
    except License.DoesNotExist:
        return Response({"error": "License not found or not approved"}, status=404)

    html_content = render_to_string("license_template.html", {"license": license_obj})
    pdf = HTML(string=html_content).write_pdf()
    response = HttpResponse(pdf, content_type="application/pdf")
    response["Content-Disposition"] = f'attachment; filename="license_{license_obj.name}.pdf"'
    return response
