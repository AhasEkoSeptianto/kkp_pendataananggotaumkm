import User from '@base/src/models/user'
const jwt = require("jsonwebtoken");
import dbConnect from '@base/src/midleware/mongodb'
import Anggota from '@base/src/models/anggota';

export default async function handler(req:any, res:any) {
    const { method } = req
    const {nama, email, noTelp, alamat, tanggal_lahir, toko} = req.body
    const { uniq_id } = req.query
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
                    toko: toko
                })
            
                try {
                    anggotaBaru.save()
                    res.status(200).json({  msg:'berhasil menambahkan anggota ' + nama });
                }catch{
                    res.status(500).send({ msg: 'gagal menyimpan data' })
                }

            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
    
        case 'GET':
            try {
                let anggota = await Anggota.find({})
                res?.status(200).json({ msg: 'berhasil mengambil data', data: anggota })

            }catch{
                res.status(500).send({ msg: 'error' })
            }
            break
        case 'DELETE':
            try {
                await Anggota.deleteOne({_id: uniq_id})
                res.status(200).json({ msg: 'success' })
            }catch(err){
                res.status(500).send({ msg: 'error' })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}