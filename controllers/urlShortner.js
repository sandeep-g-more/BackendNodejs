
import { UrlShortener } from "../modules/urlShortner.js";
import { nanoid } from 'nanoid';


 const handleGenerateNewSHortUrl=async (req,res)=>{
  const body=req.body
  if(!body.url) return res.status(400).json({error:"url is required"})
  const shortId=nanoid(8);
  await UrlShortener.create({shortId,redirectUrl:body.url,visitHistory:[]})
  return res.json({id:shortId})
}

const countVisited=async (req,res)=>{
  const shortId=req.params.shortId;
  await UrlShortener.findByIdAndUpdate({
    shortId,
  },{
    $push:{
      visitHistory:[{
       timestamp:Date.now()
      }]
    }
  })
}

export  {handleGenerateNewSHortUrl,countVisited};