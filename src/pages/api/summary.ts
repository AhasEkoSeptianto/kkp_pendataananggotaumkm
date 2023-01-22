import User from '@base/src/models/user'
import TTD from '@base/src/models/ttd'
const jwt = require("jsonwebtoken");
import dbConnect from '@base/src/midleware/mongodb'
import Anggota from '@base/src/models/anggota';
import { ValidatePagination } from '@utils/helpers/paginationBE';
import { IsIncludes } from '@utils/helpers/containsBE';
import isAuth from '@base/src/midleware/isAuth';

export default async function handler(req:any, res:any) {
    const { method } = req
    
    await dbConnect()

    await isAuth(req, res)

    switch (method) {
        
        case 'GET':
            try {
                let totalAnggota = await Anggota.count({})
                let Ttd = await TTD.find({})
                // get all list name toko
                let anggota: any = await Anggota.find({})
                let toko = anggota?.map(item => item?.['toko'])
                
                // filter all same toko
                toko = [...new Set(toko)]
                
                let makeResp = {
                    totalAnggota: totalAnggota,
                    Ttd: Ttd,
                    toko: toko
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