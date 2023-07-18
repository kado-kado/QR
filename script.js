// QRコードと画像を合成してダウンロードリンクを表示
function generateCombinedImage() {
    const qrCodeUrl = document.getElementById('urlInput').value; // 入力したURLを取得
    const qrCodeSize = 200; // QRコードのサイズ（簡易的な実装のため小さめに設定）

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
                canvas.width = image.width;
                canvas.height = image.height;
                const ctx = canvas.getContext('2d');

                // 画像を描画
                ctx.drawImage(image, 0, 0);

                // QRコードを合成
                const qrCodeX = image.width - qrCodeSize - 10; // QRコードのX座標（右上に配置する）
                const qrCodeY = 10; // QRコードのY座標（右上に配置する）
                ctx.drawImage(qrCodeImage, qrCodeX, qrCodeY, qrCodeSize, qrCodeSize);

                // プレビューを表示
                const combinedImagePreview = document.getElementById('combinedImagePreview');
                combinedImagePreview.src = canvas.toDataURL();
                combinedImagePreview.style.display = 'block';

                // ダウンロードリンクを表示
                const downloadLink = document.getElementById('downloadLink');
                downloadLink.href = canvas.toDataURL();
                downloadLink.download = 'combined_image.png';
                downloadLink.innerText = '画像をダウンロード'; // テキストを表示する
                downloadLink.style.display = 'block';
            };
            image.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}
