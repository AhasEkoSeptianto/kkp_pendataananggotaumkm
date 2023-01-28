import User from '@base/src/models/user'
const jwt = require("jsonwebtoken");
import dbConnect from '@base/src/midleware/mongodb'
import Anggota from '@base/src/models/anggota';
import { ValidatePagination } from '@utils/helpers/paginationBE';
import { IsIncludes } from '@utils/helpers/containsBE';
import isAuthToko from '@base/src/midleware/isAuthToko';

export default async function handler(req:any, res:any) {
    const { method } = req
    const {nama, email, noTelp, alamat, tanggal_lahir, toko} = req.body
    const { uniq_id, search } = req.query
    
    await dbConnect()
    try {
        isAuthToko(req, res)
    }catch{
        
    }

    switch (method) {
        
        case 'GET':
            try {
                let toko = req.query.toko || ''
                const { page, limit } = await ValidatePagination(req.query)

                let queryExe = { nama: IsIncludes(search),  email: IsIncludes(search), toko: IsIncludes(toko)}
                let total = await Anggota.count({})
                
                let anggota = await Anggota.find(queryExe).sort({ createdAt: -1 }).skip(page).limit(limit)
                res?.status(200).json({ msg: 'berhasil mengambil data', data: anggota, totalData: total })

            }catch(err){
                res.status(500).send({ msg: 'error', err: err })
            }
            break

        case 'POST':
            try {
                let anggotaBaru = new Anggota({
                    nama: nama,
                    email: email,
                    noTelp: noTelp,
                    alamat: alamat,
                    tanggal_lahir: tanggal_lahir,
                    toko: toko,
                    status: 'Aktif'
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

        case 'PUT':
            try{
                await Anggota.findOneAndUpdate({_id: uniq_id}, {
                    nama: nama,
                    email: email,
                    noTelp: noTelp,
                    alamat: alamat,
                    tanggal_lahir: tanggal_lahir,
                    toko: toko,
                },{new: true, useFindAndModify: false})
            
                res.status(200).send({msg: 'berhasil mengubah data anggota'});
            }catch(err){
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