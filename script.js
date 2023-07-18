// QRコード生成とマスク
function generateQRCode() {
    const qrCodeUrl = document.getElementById('urlInput').value; // 入力したURLを取得
    const qrCodeSize = 600;
    const qrCode = new QRCode(qrCodeSize, qrCodeSize);
    qrCode.makeCode(qrCodeUrl);

    const qrCodeCanvas = qrCode._el.querySelector('canvas');
    const qrCodeImage = new Image();
    qrCodeImage.src = qrCodeCanvas.toDataURL();

    const imageInput = document.getElementById('imageInput');
    const file = imageInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const image = new Image();
            image.onload = function () {
                const canvas = document.createElement('canvas');
                canvas.width = qrCodeSize;
                canvas.height = qrCodeSize;
                const ctx = canvas.getContext('2d');

                // 画像を600pxに縮小
                const aspectRatio = image.width / image.height;
                const newHeight = qrCodeSize;
                const newWidth = newHeight * aspectRatio;
                ctx.drawImage(image, 0, 0, newWidth, newHeight);

                // 600x600に切り取り
                const xOffset = (qrCodeSize - newWidth) / 2;
                ctx.drawImage(image, 0, 0, newWidth, newHeight, xOffset, 0, newWidth, newHeight);

                // QRコードをマスク
                ctx.drawImage(qrCodeImage, 0, 0, qrCodeSize, qrCodeSize);

                // プレビューを表示
                const qrCodePreview = document.getElementById('qrCodePreview');
                qrCodePreview.src = qrCodeImage.src;

                const maskedImagePreview = document.getElementById('maskedImagePreview');
                maskedImagePreview.src = canvas.toDataURL();
            };
            image.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}
