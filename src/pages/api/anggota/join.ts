import User from '@base/src/models/user'
const jwt = require("jsonwebtoken");
import dbConnect from '@base/src/midleware/mongodb'
import Anggota from '@base/src/models/anggota';
import { ValidatePagination } from '@utils/helpers/paginationBE';
import { IsIncludes } from '@utils/helpers/containsBE';

export default async function handler(req:any, res:any) {
    const { method } = req
    const {nama, email, noTelp, alamat, tanggal_lahir, toko} = req.body
    
    await dbConnect()

    switch (method) {
        case 'POST':
            try {
                let anggotaBaru = new Anggota({
                    nama: nama,
                    email: email,
                    noTelp: noTelp,
                    alamat: alamat,
                    tanggal_lahir: tanggal_lahir,
                    status: 'Pending register',
                    toko: toko
                })
            
                try {
                    anggotaBaru.save((err) => {
                        if (err){
                            res.status(400).json({ msg: err.message })
                        }else{
                            res.status(200).json({  msg:'berhasil mendaftar ' + nama });
                        }
                    })
                }catch(err){
                    res.status(500).send({ msg: 'gagal mendaftar' })
                }

            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}