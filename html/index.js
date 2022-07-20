let URL_PARAM_PUBK = undefined;

function setUrlParamValue(pubkid)
{
    var queryString = window.location.search;
    //Just because I will add some %2F in the link.
    //when sending the link without those %2F ios fails to create the preview link ...
    queryString = queryString.replaceAll("%2F", '');


    var urlParams = new URLSearchParams(queryString);
    var b64pubk = urlParams.get(URL_PARAM_NAME);

    var publicKeyArmored = decodeMessage(b64pubk);

    document.getElementById(pubkid).value = publicKeyArmored;
}

openQrCodeTab = (urlid) => {
    var qrcodeparam = encodeMessage(`${window.document.getElementById(urlid).value}`);
    var qrcodeUrl = `${getQrCodeUrl()}${qrcodeparam}`;
    window.open(qrcodeUrl, '_blank');
};

copyValueToClipBoard = (bid, eid) => {
    var text = `${window.document.getElementById(eid).value}`;
    navigator.clipboard.writeText(text).then(() => {
        let v = document.getElementById(bid).innerHTML;
        document.getElementById(bid).innerHTML = "Copied!"
        setTimeout(() => {document.getElementById(bid).innerHTML = v}, 500);
      },
      () => {
        let v = document.getElementById(bid).innerHTML;
        document.getElementById(bid).innerHTML = "Copy error!"
        setTimeout(() => {document.getElementById(bid).innerHTML = v}, 500);
      });
};

generateURL = async (pkid, urlid, qrcodeid) => {
    var keys = await openpgp.generateKey({userIDs:{name: 'Share your secret'}, passphrase: PASSPHRASE});
    var publicKeyArmored = keys.publicKey.trim();
    var privateKeyArmored = keys.privateKey.trim();
    document.getElementById(pkid).value = privateKeyArmored;
    var encodedPublicKey = encodeURIComponent(encodeMessage(publicKeyArmored));

    //Just because I will add some %2F in the link.
    //when sending the link without those %2F ios fails to create the preview link ...
    var step = 75;
    var s = "%2F";
    var rr = encodedPublicKey;
    var r = '';
    while (rr.length > 0)
    {
        r = r + s + rr.slice(0, step);
        rr = rr.slice(step)
    }
    encodedPublicKey = r;
    

    var url = `${getEncryptUrl()}${encodedPublicKey}`;
    document.getElementById(urlid).value = url;
};

encrypt = async (pubkid, mid, emid) => {
    var publicKeyArmored = document.getElementById(pubkid).value.trim();
    var m = document.getElementById(mid).value.trim();

    var publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });

    var encrypted = await openpgp.encrypt({
        message: await openpgp.createMessage({ text: m }),
        encryptionKeys: publicKey,
    });

    var encodedMessage = btoa(encrypted.trim());

    document.getElementById(emid).value = encodedMessage.trim();
};

decrypt = async (pkid, emid, dmid) => {
    var privateKeyArmored = document.getElementById(pkid).value.trim();

    var privateKey = await openpgp.decryptKey({
        privateKey: await openpgp.readPrivateKey({ armoredKey: privateKeyArmored }),
        passphrase: PASSPHRASE
    });

    var encrypted = decodeMessage(document.getElementById(emid).value);

    var message = await openpgp.readMessage({
        armoredMessage: encrypted
    });

    var { data: decrypted } = await openpgp.decrypt({
        message,
        decryptionKeys: privateKey
    });

    document.getElementById(dmid).value = decrypted;
};