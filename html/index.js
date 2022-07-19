const passphrase = `share your secret passphrase or not whatever`;
const urlParamName = `p`;

function clearElementById(id)
{
    document.getElementById(id).value='';
};

function getBaseURL()
{
    return `${window.location.protocol}//${window.location.host}/encrypt.html?${urlParamName}=`;
}

function encodeMessage(message)
{
    return btoa(message.trim()).trim();
}

function decodeMessage(message)
{
    return atob(message.trim()).trim();
}

copyValueToClipBoard = (eid) => {
    
    var text = `${window.document.getElementById(eid).value}`;
    navigator.clipboard.writeText(text).then(() => {
        /* Resolved - text copied to clipboard */
      },
      () => {
        /* Rejected - clipboard failed */
      });
};

generateURL = async (pkid, urlid, qrcodeid) => {
    const keys = await openpgp.generateKey({userIDs:{name: 'Share your secret'}, passphrase: passphrase});

    const publicKeyArmored = keys.publicKey.trim();
    // document.getElementById(pubkid).value = publicKeyArmored;

    const privateKeyArmored = keys.privateKey.trim();
    document.getElementById(pkid).value = privateKeyArmored;

    const encodedPublicKey = encodeURIComponent(encodeMessage(publicKeyArmored));
    const url = `${getBaseURL()}${encodedPublicKey}`;
    document.getElementById(urlid).value = url;
    // var qrcode = new QRCode(document.getElementById(qrcodeid), {
    //     text: url,
    //     width: 1000,
    //     height: 1000,
    //     colorDark : "#000000",
    //     colorLight : "#ffffff",
    //     correctLevel : QRCode.CorrectLevel.H
    // });
};

encrypt = async (pubkid, mid, emid) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const b64pubk = urlParams.get(urlParamName);
    const publicKeyArmored = decodeMessage(b64pubk);

    document.getElementById(pubkid).value = publicKeyArmored;

    const m = document.getElementById(mid).value.trim();

    const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });

    const encrypted = await openpgp.encrypt({
        message: await openpgp.createMessage({ text: m }),
        encryptionKeys: publicKey,
    });

    const encodedMessage = btoa(encrypted.trim());

    document.getElementById(emid).value = encodedMessage.trim();
};

decrypt = async (pkid, emid, dmid) => {
    const privateKeyArmored = document.getElementById(pkid).value.trim();

    const privateKey = await openpgp.decryptKey({
        privateKey: await openpgp.readPrivateKey({ armoredKey: privateKeyArmored }),
        passphrase
    });

    const encrypted = decodeMessage(document.getElementById(emid).value);

    const message = await openpgp.readMessage({
        armoredMessage: encrypted
    });

    const { data: decrypted } = await openpgp.decrypt({
        message,
        decryptionKeys: privateKey
    });

    document.getElementById(dmid).value = decrypted;
};