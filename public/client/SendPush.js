
const webPush = require('web-push');
const title = document.getElementById('titlePush')
const PushDetails = document.getElementById('PushDetails')

let vapidKeys = {
    publicKey: 'BPADXDsIVALAh0-ebkNudzZSWLpu7QvhRNAM0cgCQU2yfuMtQbBpsFMz6HGpL88Xzvq5AfboeWdAOMGtiqPSnlY',
    privateKey: '80HDDQuXiFi8_SslrxobOfXqPJUBetmEAv_cjJ7g3_Q'
}

const send = document.getElementById("send")
send.addEventListener('click', sendPush)

var sendPush = () => {
    
    webPush.setVapidDetails(
        'mailto:nzelaweb@gmail.com',
        vapidKeys.publicKey,
        vapidKeys.privateKey
    );

    const message = JSON.stringify({
        title: title.value,
        body: PushDetails.value,
        icon: 'https://nzelaweb.com/img/icon3.png'
    });

    webPush
    .sendNotification(subscription, message)
    .then((_) => {
        console.log('Notification envoyée avec succès');
    })
    .catch(error => console.error(error));
}
