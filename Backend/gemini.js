import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config'
import sharp from 'sharp'

const genAI=new GoogleGenerativeAI(process.env.API_KEY)
const MAX_DIMENSION=384;
const schema={
    "type": "object",
    "properties": {
        "result": {
            "type": "boolean",
            "description": "the boolean value should be true if it is safe , false otherwise "
        },
        "reason":{
            "type":"string",
            "description": "a breif description of why do you think its appropraite or inappropraite "
        }
    },
    "required": ["result"]
}
const model=genAI.getGenerativeModel({
    model:'gemini-1.5-flash-8b',
    generationConfig:{
        responseMimeType:'application/json',
        responseSchema:schema
    }
})

async function checkImage(blob,type){
    const base64=await resize(Buffer.from(blob))
    const result= await model.generateContent([
        {
            inlineData: {
                data: base64,
                mimeType: type,
            },
        },
        `Determine if the image is appropriate for children aged 13 and under. 
        **Do not** block images related to web development, technology, educational content, or programming tech stacks. 
        Only flag images that contain explicit, violent, or highly inappropriate content.`,
    ])
    return result
}

//take image as input of type buffer return a base 64 string of 
//the compresed image 
async function resize(imageBuffer) {
    const metadata=await sharp(imageBuffer).metadata()

    if(metadata.width<=MAX_DIMENSION && metadata.height<=MAX_DIMENSION){
        console.log('no need of resizing');
        return imageBuffer.toString('base64')
    }
    const resizedBuffer=await sharp(imageBuffer).resize(
        {
            width:MAX_DIMENSION,
            height:MAX_DIMENSION,
            fit:'inside',
        }
    ).toBuffer();

    // await sharp(resizedBuffer).toFile('chota-image.jpg')
    return resizedBuffer.toString('base64')
}

export default checkImage