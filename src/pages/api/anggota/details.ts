import User from '@base/src/models/user'
const jwt = require("jsonwebtoken");
import dbConnect from '@base/src/midleware/mongodb'
import Anggota from '@base/src/models/anggota';
import { ValidatePagination } from '@utils/helpers/paginationBE';
import { IsIncludes } from '@utils/helpers/containsBE';

export default async function handler(req:any, res:any) {
    const { method } = req
    
    await dbConnect()

    switch (method) {
        
        case 'GET':
            try {
                var anggota = await Anggota.find({_id: req.query.user_id});
                
                res?.status(200).json({ msg: 'berhasil mengambil data', data: anggota })

            }catch(err){
                res.status(500).send({ msg: 'error', err: err, data: [] })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}