from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    # ...（其他URL配置）
    path('handle/', views.getData, name='register'),
    path('upload/', views.file_upload, name='file-upload'),
]
# 仅在开发模式下提供媒体文件服务
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)