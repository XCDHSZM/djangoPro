from django.shortcuts import render,HttpResponse
from django.views.decorators.http import require_POST
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import os
# Create your views here.
@api_view(['GET'])
def getData(request):
    return render(request,"dataHandle.html")

@csrf_exempt
def file_upload(request):
    if request.method == 'POST':
        files = request.FILES.getlist('files')
        for file in files:
            # 处理上传的文件
            file_name = file.name
            # # 读取文件内容
            # content = file.read()
            # 创建保存文件的完整路径
            file_path = os.path.join('media', file_name)
            
            # 保存文件
            with open(file_path, 'wb') as destination:
                for chunk in file.chunks():
                    destination.write(chunk)
        return JsonResponse({'message': 'Files uploaded successfully!'})
    return JsonResponse({'error': 'Invalid request'}, status=400)