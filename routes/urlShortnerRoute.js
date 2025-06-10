import mongoose from 'mongoose';
import express from 'express'
import {handleGenerateNewSHortUrl,countVisited} from '../controllers/urlShortner.js'
const urlRouter=express.Router()
urlRouter.post('/',handleGenerateNewSHortUrl);
urlRouter.get('/:shortId',countVisited)
export default urlRouter;