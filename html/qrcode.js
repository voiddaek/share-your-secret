
function setQrCodeUrlParamValue(qrcodeid)
{
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var qrcode = urlParams.get(QRCODE_URL_PARAM_NAME);

    qrcode = decodeMessage(qrcode);

    createQRCode(qrcodeid, qrcode);
}

function createQRCode(qrcodeid, value)
{
    var size = (window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth) * 0.95;

    console.log(window.innerHeight);
    console.log(window.innerWidth);
    var qrcode = new QRCode(document.getElementById(qrcodeid), {
        text: value,
        width: size,
        height: size,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
}