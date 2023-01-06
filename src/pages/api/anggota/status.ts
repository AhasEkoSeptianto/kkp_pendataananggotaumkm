import User from '@base/src/models/user'
const jwt = require("jsonwebtoken");
import dbConnect from '@base/src/midleware/mongodb'
import Anggota from '@base/src/models/anggota';

export default async function handler(req:any, res:any) {
    const { method } = req
    const { status } = req.body
    const { uniq_id } = req.query
    
    await dbConnect()

    

    switch (method) {
        case 'PUT':
            try{
                await Anggota.findOneAndUpdate({_id: uniq_id}, {
                    status: status,
                    berhenti_pada: status === 'Berhenti' ? new Date() : '' 
                },{new: true, useFindAndModify: false})
            
                res.status(200).send({message: 'berhasil mengubah status data anggota'});
            }catch(err){
                res.status(500).send({ message: 'error' })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}