// 判断谁处于被点击的状态
$(function () {
    $(".sidebar-link").click(function () {
        $(".sidebar-link").removeClass("is-active");
        $(this).addClass("is-active");
    });
    // 添加新的点击事件处理器
    $("#toggleSidebar").click(function () {
        $(".sidebar").toggleClass("collapse");
    });
});

$(window)
    .resize(function () {
        if ($(window).width() > 1090) {
            $(".sidebar").removeClass("collapse");
        } else {
            $(".sidebar").addClass("collapse");
        }
    })
    .resize();

const allVideos = document.querySelectorAll(".video");

allVideos.forEach((v) => {
    v.addEventListener("mouseover", () => {
        const video = v.querySelector("video");
        video.play();
    });
    v.addEventListener("mouseleave", () => {
        const video = v.querySelector("video");
        video.pause();
    });
});

$(function () {
    $(".logo, .logo-expand, .uploads").on("click", function (e) {
        $(".main-container").removeClass("show");
        $(".main-container").scrollTop(0);
    });
    $(".trending, .video").on("click", function (e) {
        $(".main-container").addClass("show");
        $(".main-container").scrollTop(0);
        $(".sidebar-link").removeClass("is-active");
        $(".trending").addClass("is-active");
    });
});


// 上传文件并显示进度条
const uploadArea = document.getElementById('upload-area');
const fileInput = document.getElementById('file-upload');
const progressBar = document.getElementById('upload-progress');
const fileNamesContainer = document.getElementById('file-names');

uploadArea.addEventListener('click', function () {
    fileInput.click();
});

uploadArea.addEventListener('dragover', function (e) {
    e.preventDefault();
    uploadArea.style.borderColor = '#000';
});

uploadArea.addEventListener('dragleave', function () {
    uploadArea.style.borderColor = '#ccc';
});

uploadArea.addEventListener('drop', function (e) {
    e.preventDefault();
    uploadArea.style.borderColor = '#ccc';
    handleFiles(e.dataTransfer.files);
});

fileInput.addEventListener('change', function () {
    handleFiles(fileInput.files);
});

function handleFiles(files) {
    if (files.length > 0) {
        progressBar.style.display = 'block';
        displayFileNames(files);
        uploadFiles(files);
    }
}

function displayFileNames(files) {
    fileNamesContainer.innerHTML = ''; // 清空之前的文件名
    Array.from(files).forEach(file => {
        const fileNameElement = document.createElement('div');
        fileNameElement.textContent = file.name;
        fileNamesContainer.appendChild(fileNameElement);
    });
}

function uploadFiles(files) {
    const totalFiles = files.length;
    let uploadedFiles = 0;

    Array.from(files).forEach((file, index) => {
        // 模拟上传进度，增加时间间隔让进度条变慢
        const reader = new FileReader();
        reader.onloadstart = function () {
            progressBar.value = (uploadedFiles / totalFiles) * 100;
        };
        reader.onload = function () {
            // 在文件读取过程中，模拟上传的进度更新
            const fakeProgressInterval = setInterval(() => {
                progressBar.value += 5; // 每次增加5%进度
                if (progressBar.value >= (uploadedFiles + 1) / totalFiles * 100) {
                    clearInterval(fakeProgressInterval);
                }
            }, 200); // 每200ms增加一次进度
        };
        reader.onloadend = function () {
            uploadedFiles++;
            if (uploadedFiles === totalFiles) {
                setTimeout(() => {
                    progressBar.style.display = 'none';
                }, 1000); // 延迟1秒隐藏进度条
            }
        };
        reader.readAsDataURL(file);
    });
}


