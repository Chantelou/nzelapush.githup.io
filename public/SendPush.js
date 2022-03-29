
const webPush = require('web-push');
const title = "Notification test"
const PushDetails = "Bonjour tous le monde fan de Nzela"

let vapidKeys = {
    publicKey: 'BPADXDsIVALAh0-ebkNudzZSWLpu7QvhRNAM0cgCQU2yfuMtQbBpsFMz6HGpL88Xzvq5AfboeWdAOMGtiqPSnlY',
    privateKey: '80HDDQuXiFi8_SslrxobOfXqPJUBetmEAv_cjJ7g3_Q'
}



var sendPush = () => {
    
    webPush.setVapidDetails(
        'mailto:nzelaweb@gmail.com',
        vapidKeys.publicKey,
        vapidKeys.privateKey
    );

    const message = JSON.stringify({
        title: title,
        body: PushDetails,
        icon: 'https://nzelaweb.com/img/icon3.png'
    });

    const subscription = {
        endpoint: 'https://wns2-par02p.notify.windows.com/w/?token=BQYAAADWAwy028nKhaQqNjmyjO53%2fjBtXrDRWmdwA2DP7vu4PV7qCIMR%2bfopuSt2zqRwka%2bkdEpYcCWTOxyGeNjEd%2fbZX4JTgOWd%2bUENQyQFxmqgjL8itdyEmhXNh3wkSUOWOEdg2YcRkYrkzOFqNaZtIfWQgGL8Ootq0KTozMs6rbUdDVuKTJguOCrKM6YyZ5NvWF37AyabkDCP5IMFGLihwzN8zy2t5%2fDbWtHck79NJBB1jBpdycyzZz8OmWDuppIfJuFn1CVaXlHyGe%2f509SD9XBYLDQemkc00mz3KGGRNbPc4yBacPzrdp8wHE2lw%2ftwp3w%3d',
        keys: {
            auth: 'IrabOhezeSAPUbxNzoFhyw',
            p256dh: 'BFWnUNi3aU-vVbgArtL4ezgK5XyClJlLkYHoWz3HzAbk3KMiP0NliZGMn1Ceky9dFTjVZonk5iZpJajZEQ0QWVE'
        }
    };

    webPush
    .sendNotification(subscription, message)
    .then((_) => {
        console.log('Notification envoyée avec succès');
    })
    .catch(error => console.error(error));
}

sendPush()
