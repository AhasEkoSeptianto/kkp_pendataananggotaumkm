import User from '@base/src/models/user'
const jwt = require("jsonwebtoken");
import dbConnect from '@base/src/midleware/mongodb'
import Anggota from '@base/src/models/anggota';
import { ValidatePagination } from '@utils/helpers/paginationBE';
import { IsIncludes } from '@utils/helpers/containsBE';
import moment from 'moment';
import isAuth from '@base/src/midleware/isAuth';

const today = moment().startOf('day')

export default async function handler(req:any, res:any) {
    const { method } = req

    await dbConnect()

    await isAuth(req, res);

    switch (method) {
        
        case 'GET':
            try {
                let anggota = await Anggota.find({ 
                    created_at: {
                        $gte: moment(today).subtract(12, 'M'),
                        $lte: moment(today).add(1, 'M')
                    }
                 })
                
                 // let anggota = await Anggota.find({})
                res?.status(200).json({ msg: 'berhasil mengambil data', data: anggota })

            }catch(err){
                res.status(500).send({ msg: 'error', err: err })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}