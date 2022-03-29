const http = require('http')
const fs = require('fs')
const url = require("url")
const Emiter = require('events')
const webPush = require('web-push')
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
let resultPush = ''
let errorPush = ''

//Connection à MySql
const bd = require("./connection/db") 
const { Console } = require('console')


//Moteur de template
app.set('view engine', 'ejs')

//Mes middleeware
app.use('/assets',express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Les Routes
app.get('/', (request, response) => {
    response.render('./index', {test: 'NZELA'})
})

app.get('/pages/pushResponse', (request, response) => {
    response.render('./pages/pushResponse', {test: 'NZELA'})
})

//les Requettes Post pour la notification
app.post('/', (request, response) => {
    if (request.body.title === undefined || request.body.title ==='' || request.body.messagePush === undefined || request.body.messagePush === '') {

        response.render('./index', {test: 'NZELA', error: 'Veuillez remplir tous les champs correctements !'}) 
        
    } else {

        //On envoi la notification
        if (request.body.title === undefined || request.body.title ==="" || request.body.messagePush ===undefined || request.body.messagePush ==="") {
  
            response.render('./index', {test: 'NZELA', error: "En attente de paramettre pour l'envoi de la notification"}) 
           // console.log("En attente de paramettre pour l'envoi de la notification")
      
        } else {

            
            //Recupération des données dans la base de données
            bd.query("SELECT * FROM notification", function (err, data) {
                if (err) throw err;
                
               /* for (donnees of data) {*/
                   
                    let vapidKeys = {
                        publicKey: 'BPADXDsIVALAh0-ebkNudzZSWLpu7QvhRNAM0cgCQU2yfuMtQbBpsFMz6HGpL88Xzvq5AfboeWdAOMGtiqPSnlY',
                        privateKey: '80HDDQuXiFi8_SslrxobOfXqPJUBetmEAv_cjJ7g3_Q'
                    }
                
                    webPush.setVapidDetails(
                        'mailto:nzelaweb@gmail.com',
                        vapidKeys.publicKey,
                        vapidKeys.privateKey
                    )
                
                    const message = JSON.stringify({
                        title: request.body.title,
                        body: request.body.messagePush,
                        icon: 'https://nzelaweb.com/img/icon3.png'
                    })
                
                    /*const subscription = {
                        endpoint: donnees.endPoint,
                        keys: {
                            auth:  donnees.auth,
                            p256dh:  donnees.p256dh
                        }
                    }*/

                    const subscription = {
                        endpoint: 'https://fcm.googleapis.com/fcm/send/etro8aLy81w:APA91bGP-7v2w_j1YLRjvX38smK79wFmRr0-ZwNn8c1_BJ_pyMXaJz4NmxzSLkL-2IBcAMhq_tRBRM9PvjESu550Y7214UWKxw1387l4Flsjll3nCx7dKXz2fv1OLw3I0sguBbr1Psjd',
                        keys: {
                            auth: 'LrGMQZ7coU_bp_K_GmixIw',
                            p256dh: 'BLI5P2Lrh06EmnrG33VgX1QStbmndQAGCZPr6RveBZkKMZbzy-AT8D5fggwiNr81dbmc4sR0_6HHX9zvt_FAyBk'
                        }
                    }
                
                    webPush
                        .sendNotification(subscription, message)
                        .then((_) => {
                            resultPush +=  "Notification envoyée avec succès à l'adresse: "+donnees.endpoint + ", Navigateur utilisé: " + donnees.navigator + "<br/><br/>"
                        })
                        .catch( (error) =>{
                            errorPush +=  error + '; '
                        });

                /*}*/


                response.render('./pages/pushResponse', {test: 'NZELA', resultPush: resultPush, errorPush:errorPush })
                
                console.error(errorPush)
                console.error(resultPush)
                
            })
            
        }   
        
    }
    
})

app.listen(5000)