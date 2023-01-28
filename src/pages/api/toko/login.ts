const jwt = require("jsonwebtoken");
import dbConnect from '@base/src/midleware/mongodb'
import Anggota from '@base/src/models/anggota';

export default async function handler(req:any, res:any) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'POST':
      try {
        
        let anggota:any = await Anggota.findById(req.body.ID);
        
          if (!anggota || anggota.length < 1) {
            return res.status(404).json({msg:'user unknow' , login: false});
          };
   
          const token = jwt.sign(
                { id: anggota?._id, nama: anggota?.nama },
                process.env.JWTTOKENTOKO
            );
            res.status(200).json({ login: true, msg:'success', token: token, ...anggota });
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}