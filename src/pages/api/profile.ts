import User from '@base/src/models/user'
const jwt = require("jsonwebtoken");
import dbConnect from '@base/src/midleware/mongodb'

export default async function handler(req:any, res:any) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        let user:any = await User.find({}); // check ke mongodb
        
        
        res.status(200).json({ login: true, msg:'success', data: user });
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'PUT': 
        try{

            let uniq_id = req?.query?.uniq_id
            let { username, password, profile_picture } = req?.body
            
            let form_to_update = {
              username: username,
              profile_picture: profile_picture,
              password: password
            }

            await User.findOneAndUpdate({_id: uniq_id}, form_to_update ,{new: true, useFindAndModify: false})
        
            res.status(200).send({msg: 'berhasil mengubah data anggota okeh', data: form_to_update});
        }catch(err){
            res.status(500).send({ msg: 'error' })
        }
        break;
    default:
      res.status(400).json({ success: false })
      break
  }
}