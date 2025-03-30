import express from "express"
import 'dotenv/config'
import checkImage from "./gemini.js"
import cors from  "cors"

const app=express()
const port=process.env.port
app.use(cors())
app.use('/validate',express.raw({type:'image/*',limit:'10mb'}))

app.post('/validate',async (req,res)=>{
    // console.log(req)
    console.log('request received')
    let safe=await checkImage(req.body,req.headers['Content-type'])
    // console.log(safe.response.text())

    res.status(200)
    res.json(JSON.parse(safe.response.text()))
})

app.listen(port,()=>{
    console.log(`server started on ${port}`)
})
