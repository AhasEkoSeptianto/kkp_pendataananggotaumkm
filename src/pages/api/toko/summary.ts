const jwt = require("jsonwebtoken");
import dbConnect from '@base/src/midleware/mongodb'
import Anggota from '@base/src/models/anggota';
import { IsIncludes } from '@utils/helpers/containsBE';
import isAuthToko from '@base/src/midleware/isAuthToko';

export default async function handler(req:any, res:any) {
    const { method } = req
    const { toko } = req?.query
    await dbConnect()

    try{
        await isAuthToko(req, res)
    }catch{
        
    }

    switch (method) {
        
        case 'GET':
            try {
                let totalAnggota = await Anggota.find({ toko: IsIncludes(toko) })
                
                let makeResp = {
                    totalAnggota: totalAnggota?.length,
                }

                res?.status(200).json({ msg: 'berhasil mengambil data', data: makeResp })

            }catch(err){
                res.status(500).send({ msg: 'error', err: err })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}