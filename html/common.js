const PASSPHRASE = `share your secret passphrase or not whatever`;
const URL_PARAM_NAME = `p`;
const QRCODE_URL_PARAM_NAME = `u`;

function clearElementById(id)
{
    document.getElementById(id).value='';
};

function getEncryptUrl()
{
    return `${window.location.protocol}//${window.location.host}/encrypt.html?${URL_PARAM_NAME}=`;
}

function getQrCodeUrl()
{
    return `${window.location.protocol}//${window.location.host}/qrcode.html?${QRCODE_URL_PARAM_NAME}=`;
}

function encodeMessage(message)
{
    return btoa(message.trim()).trim();
}

function decodeMessage(message)
{
    return atob(message.trim()).trim();
}