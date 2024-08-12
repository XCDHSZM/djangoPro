from django.shortcuts import render,HttpResponse
from django.views.decorators.http import require_POST
from rest_framework.decorators import api_view
from rest_framework.response import Response
# Create your views here.
@api_view(['GET'])
def getData(request):
    return render(request,"dataHandle.html")
