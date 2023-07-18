// QRコード生成
function generateQRCode() {
    const qrCodeCanvas = document.getElementById('qrCodeCanvas');
    const qrCodeContainer = document.getElementById('qrCodeContainer');
    qrCodeContainer.style.display = 'block';

    const qrCodeUrl = document.getElementById('urlInput').value; // 入力したURLを取得
    const qrCodeSize = 600;
    const qrCode = new QRCode(qrCodeCanvas, {
        text: qrCodeUrl,
        width: qrCodeSize,
        height: qrCodeSize,
    });
}
    // 画像の読み込みとマスク
    const imageInput = document.getElementById('imageInput');
    const file = imageInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const image = new Image();
            image.onload = function () {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = qrCodeSize;
                canvas.height = qrCodeSize;

                // 画像を600pxに縮小
                const aspectRatio = image.width / image.height;
                const newHeight = qrCodeSize;
                const newWidth = newHeight * aspectRatio;
                ctx.drawImage(image, 0, 0, newWidth, newHeight);

                // 600x600に切り取り
                const xOffset = (qrCodeSize - newWidth) / 2;
                ctx.drawImage(image, 0, 0, newWidth, newHeight, xOffset, 0, newWidth, newHeight);

                // QRコードをマスク
                const qrCodeImageData = qrCodeCanvas.toDataURL();
                const qrCodeImage = new Image();
                qrCodeImage.onload = function () {
                    ctx.drawImage(qrCodeImage, 0, 0, qrCodeSize, qrCodeSize);
                    const resultImageUrl = canvas.toDataURL();
                    const downloadLink = document.getElementById('downloadLink');
                    downloadLink.href = resultImageUrl;
                    downloadLink.download = 'masked_qr_code.png';
                    downloadLink.style.display = 'block';
                };
                qrCodeImage.src = qrCodeImageData;
            };
            image.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}
