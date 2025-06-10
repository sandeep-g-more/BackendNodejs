import mongoose from 'mongoose';

const urlShortenerSchema = new mongoose.Schema({
//   originalUrl: { type: String, required: true },
//   shortCode: { type: String, required: true, unique: true },
// //   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   clickCount:[ { type: Number, default: 0 }]
shortId:{
  type:String,
  required:true,
  unique:true
},
redirectUrl:{
  type:String,
  required:true
},
visitHistory:[{timestamp:{type:Number}}]

}, { timestamps: true });

export const UrlShortener = mongoose.models.UrlShortener || mongoose.model('UrlShortener', urlShortenerSchema);
