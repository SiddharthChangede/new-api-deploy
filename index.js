const express = require('express')
const app = express()
var admin = require("firebase-admin");

var serviceAccount = require("./nodejs-a8992-firebase-adminsdk-wle41-4aca5326c1.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

var data = {
    name: 'Cristiano',
    surname: 'Ronaldo',
    sport: 'Football'
}

const db = admin.firestore()

app.post('/addData', (req, res) => {
    db.collection('users').add(data).then((resp) => {
        data.id = resp.id
        db.collection('users').doc(resp.id).update(data).then((resp) => {
            console.log('Document updated successfully')
            res.send('Document updated successfully')
        })
    })
})

app.get('/getData', (req, res) => {
    db.collection('users').get().then((resp) => {
        const respData = [];
        for (let i = 0; i < resp.docs.length; i++) {
            respData.push(resp.docs[i].data())
        }
        res.send(respData)
    })
})

app.listen(process.env.PORT || 3000, () => { console.log('Listening on port 3000') });