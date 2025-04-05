import express from "express"
import 'dotenv/config'
import checkImage from "./gemini.js"
import cors from  "cors"
import {sendEmail} from "./notify.js"
import { onUninstall } from "./notify.js"
// import bodyParser from 'body-parser'


import twilio from "twilio"
const app=express()
const port=process.env.port || 3000



const accountSid = "AC0bdccdc5180bfac211e4f686ddcf276e";
const authToken = "d7157c1e2b11f674e3f3ed68b878eff3";

//use this one if thew above does not work

// const accountSid = "AC549e5aca7cbebad896ab2470826bf3fe";
// const authToken = "ad3be847147f53362f64b24c8d5151e9";

const client = new twilio(accountSid, authToken);


app.use(cors())
app.use('/register',express.json())
app.use('/notify',express.json())
app.use('/validate',express.raw({type:'image/*',limit:'10mb'}))



function sendWhatsAppAlert() {
  client.messages
    .create({
      body: `⚠️ *NetDaddy Alert!* 🚨\n\n
1️⃣ *Explicit Content Detected!*\n\n
📢 *Dear Parent,*\n\n
*NetDaddy* has detected explicit or potentially harmful content on your child’s device.\n\n
2️⃣ *Why This Alert?*\n
We continuously monitor screen activity to help you create a safer digital space for your child.\n\n
3️⃣ *What Can You Do?*\n
✅ Review the content in your *NetDaddy* dashboard.\n
✅ Adjust monitoring settings if needed.\n
✅ Contact our support team for assistance.\n\n
🔒 *Stay Assured!*\n
With *NetDaddy*, you're always a step ahead in safeguarding your child’s online experience.\n\n
*👨‍💻 The NetDaddy Team*`,

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
app.get('/uninstalled',(req,res)=>{
    let email=req.query.parentEmail
    onUninstall(email)
    res.send('extension uninstalled')
    res.status(200)
})
app.listen(port,()=>{
    console.log(`server started on ${port}`)
})
