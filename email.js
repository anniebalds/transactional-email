const SibApi = require('sib-api-v3-sdk');
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')

// initiate app
const app = express()
// set up request logging
app.use(morgan('dev'))
// parse JSON
app.use(express.json())
// parse URL-encoded
app.use(express.urlencoded({ extended: true }))

// set up Sendinblue API 
const defaultClient = SibApi.ApiClient.instance;
// Configure API key authorization: api-key
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.API_KEY


// Send a transactional email
const apiInstance = new SibApi.TransactionalEmailsApi();

sendSmtpEmail = {
    sender: {
        name: 'Anna Sender Test',
        email: 'annabaldwin56@gmail.com'
    },
    to: [{
        email: 'annabaldwin56@gmail.com',
        name: 'Anna Receiver Test'
    }],
    subject: 'Subject of your test',
    textContent: 'Body of your test'
};

apiInstance.sendTransacEmail(sendSmtpEmail)
.then((data) => {
  console.log('API called successfully. Returned data: ' + data);
})
.catch((error) => console.error(error))


// Receive data from the five required webhooks. Ngrok is hosting a live server
// and the base url is in my account. 
app.post(`/delivered`, (req, res) => {
    let body = req.body
    console.log(body)  
    res.status(200).end()
})

app.post(`/opened`, (req, res) => {
    let body = req.body
    console.log(body)  
    res.status(200).end()
})

app.post(`/clicked`, (req, res) => {
    let body = req.body
    console.log(body)  
    res.status(200).end()
})

app.post(`/hard-bounce`, (req, res) => {
    let body = req.body
    console.log(body)  
    res.status(200).end()
})

app.post(`/soft-bounce`, (req, res) => {
    let body = req.body
    console.log(body)  
    res.status(200).end()
})

// listen on defined port
app.listen(process.env.PORT || 80, () => {
    console.log(`app listening on http://localhost:80`)
})