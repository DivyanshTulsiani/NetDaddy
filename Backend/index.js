import express from "express"
import 'dotenv/config'
import checkImage from "./gemini.js"
import cors from  "cors"
import {sendEmail} from "./notify.js"
// import bodyParser from 'body-parser'

const app=express()
const port=process.env.port
app.use(cors())
app.use('/register',express.json())
app.use('/notify',express.json())
app.use('/validate',express.raw({type:'image/*',limit:'10mb'}))

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
    console.log('api hit');
    console.log(req.body.parentEmail);
    sendEmail(req.body.parentEmail);
    res.send('ok')
    res.status(200)
})
app.listen(port,()=>{
    console.log(`server started on ${port}`)
})
