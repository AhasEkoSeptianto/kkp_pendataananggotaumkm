import User from '@base/src/models/user'
const jwt = require("jsonwebtoken");
import dbConnect from '@base/src/midleware/mongodb'
import Anggota from '@base/src/models/anggota';

export default async function handler(req:any, res:any) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        let anggota: any = await Anggota.find({})
        
        // get all list name toko
        let toko = anggota?.map(item => item?.['toko'])
        
        // filter all same toko
        toko = [...new Set(toko)]
        
        res.status(200).json({  msg:'success',  data: toko });
      

      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}