import express from "express"
import 'dotenv/config'
import checkImage from "./gemini.js"
import cors from  "cors"
import {sendEmail} from "./notify.js"

// import bodyParser from 'body-parser'


import twilio from "twilio"
const app=express()
const port=process.env.port || 3000



const accountSid = "AC549e5aca7cbebad896ab2470826bf3fe";
const authToken = "ad3be847147f53362f64b24c8d5151e9";

const client = new twilio(accountSid, authToken);


app.use(cors())
app.use('/register',express.json())
app.use('/notify',express.json())
app.use('/validate',express.raw({type:'image/*',limit:'10mb'}))



function sendWhatsAppAlert() {
  client.messages
    .create({
      body: `⚠️ Alert from NetDaddy:🚨 \n\n
      ⦾ Explicit Content Detected on Your Childs Device \n
      Dear Parent, \n

        NetDaddy has detected explicit or potentially harmful content on your childs screen.
        We understand how important it is to provide a safe and secure digital environment for your child. Thats why NetDaddy continuously monitors content in real time and alerts you instantly if any age-inappropriate material is accessed.
        Our goal is to empower you with timely information so you can take the right steps to protect your child from online risks.
        If you have any questions or would like to customize the monitoring level, feel free to access your NetDaddy dashboard or contact our support team.
        Stay assured — with NetDaddy, youre always one step ahead in safeguarding your childs digital journey.
        Sincerely \n
        The NetDaddy Team`,

      from: 'whatsapp:+14155238886', // Twilio Sandbox number
      to: 'whatsapp:+919717329267'   // Your verified phone number
    })
    .then(message => console.log(`WhatsApp message sent: ${message.sid}`))
    .catch(err => console.error('Twilio error:', err));
}


app.post('/validate',async (req,res)=>{
    // console.log(req)
    console.log('request received')
    // console.log(req.body)
    let safe=await checkImage(req.body,req.headers['content-type'])
    console.log(safe.response.text())

    res.status(200)
    res.json(JSON.parse(safe.response.text()))
})

// app.post('/register',(req,res)=>{
//     // console.log(req.header)
//     // console.log(req.body)
//     console.log(req.body.parentEmail);
//     res.send('ok')
//     res.status(200)
// })

app.post('/notify',(req,res)=>{
    sendEmail(req.body.parentEmail,req.body.reason);
    res.send('ok')
    res.status(200)
})


app.post('/whatsapp-alert', (req, res) => {
    sendWhatsAppAlert();
    res.send('WhatsApp alert sent');
  });

app.listen(port,()=>{
    console.log(`server started on ${port}`)
})
