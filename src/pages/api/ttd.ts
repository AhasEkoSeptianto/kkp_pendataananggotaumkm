import Ttd from '@base/src/models/ttd'
const jwt = require("jsonwebtoken");
import dbConnect from '@base/src/midleware/mongodb'
import isAuth from '@base/src/midleware/isAuth';

export default async function handler(req:any, res:any) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        let ttd = await Ttd.find({})
        res.status(200).json({ msg: 'berhasil get data', data: ttd })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'PUT': 
        try {
            await isAuth(req, res);
            let ttd = await Ttd.findOneAndUpdate({ id: req.query.uniq_id }, {
                img_base64: req.body.img_base64,
                nama: req.body.nama
            }, { new: true, useFindAndModify: false })
            
            res?.status(200).json({ msg: 'berhasil mengubah' })

        } catch (error) {
            res.status(500).json({ msg: 'error'})
        }
        break
    default:
      res.status(400).json({ success: false })
      break
  }
}