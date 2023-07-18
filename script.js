let qrCodeImageData = null;
let imageFile = null;

// QRコード生成
function generateQRCode() {
    const qrCodeUrl = document.getElementById('urlInput').value; // 入力したURLを取得
    const qrCodeSize = 600;
    const qrCode = new QRCode(qrCodeSize, qrCodeSize);
    qrCode.makeCode(qrCodeUrl);

    const qrCodeCanvas = qrCode._el.querySelector('canvas');
    qrCodeImageData = qrCodeCanvas.toDataURL();

    const qrCodePreview = document.getElementById('qrCodePreview');
    qrCodePreview.src = qrCodeImageData;
    qrCodePreview.style.display = 'block';
}

// 画像にQRコードをマスクする
function maskImageWithQRCode() {
    if (qrCodeImageData && imageFile) {
        const qrCodeImage = new Image();
        qrCodeImage.onload = function () {
            const canvas = document.createElement('canvas');
            canvas.width = qrCodeImage.width;
            canvas.height = qrCodeImage.height;
            const ctx = canvas.getContext('2d');

            ctx.drawImage(qrCodeImage, 0, 0);

            const image = new Image();
            image.onload = function () {
                ctx.drawImage(image, 0, 0, qrCodeImage.width, qrCodeImage.height);
                const maskedImagePreview = document.getElementById('maskedImagePreview');
                maskedImagePreview.src = canvas.toDataURL();
                maskedImagePreview.style.display = 'block';
            };
            image.src = URL.createObjectURL(imageFile);
        };
        qrCodeImage.src = qrCodeImageData;
    }
}

// 画像を選択した際の処理
document.getElementById('imageInput').addEventListener('change', function (event) {
    imageFile = event.target.files[0];
});
