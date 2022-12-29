import { Fragment, useEffect } from "react";
import React, { useState } from "react";
import Image from "next/image";
import LogoMerchant from "@base/src/asset/img/merchant.png"
import { Input, Button, Loading } from "@nextui-org/react";
import Axios from 'axios'
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { DatePicker, Select } from "antd";
import axios from "axios";

export default function JoinUMKM(){

    const initialForm = {
        nama: null,
        email: null,
        noTelp: null,
        alamat: null,
        tanggal_lahir: null,
        toko: null
    }

    const [ form,setForm ] = useState(initialForm)

    const [ isTambahToko, setTambahToko ] = useState(false)
    const [ listToko, setListToko ] = useState([])
    const [ loadingSubmit, setLoadingSubmit ] = useState(false)

    // get list toko avaible
    useEffect(() => {
        axios.get('/api/toko')
            .then(res => {
                setListToko(res?.data?.data)
            })
    },[])


    const HandleChangeToko = (val) => {
        if (val === 'tambah'){
            setTambahToko(true)
            setForm({ ...form, toko: '' })
        }else{
            setForm({ ...form, toko: val })
        }
    }

    const HandleSubmit = async e => {
        e.preventDefault()
        setLoadingSubmit(true)
        
        await axios.post('/api/anggota/join', form)
            .then(res => {
                toast.success('Berhasil Mendaftar, harap tunggu sampai admin menyetujuinya')
            }).catch(err => {
                toast.error(err.response.data.msg, { position: toast.POSITION.TOP_CENTER })
            })
        
        setLoadingSubmit(false)
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
            <div className="bg-blue-primary hidden lg:flex flex-col item-center justify-center">
                <p className="text-3xl text-center text-white">Anggota Paguyuban UMKM</p>
                <p className="text-3xl text-center text-white">Taman Harapan Baru</p>
                <div className="mx-auto mt-10">
                    <Image 
                        alt=""
                        src={LogoMerchant}
                    />
                </div>
            </div>
            <div className="flex flex-col items-center justify-center">
                <div className="blur-lg lg:hidden absolute bg-blue-primary w-screen h-screen flex items-center justify-center">
                    <Image alt='' src={LogoMerchant} />
                </div>
                
                <form className="my-20 w-10/12 lg:w-10/12 space-y-10 bg-white z-20 p-10 rounded" onSubmit={HandleSubmit}>
                    <div className="mb-5">
                        <p className="text-2xl font-semibold">Selamat Datang</p>
                        <p className="text-lg">Untuk bergabung dengan kami harap isi form berikut dan tunggu pihak anggota menyetujuinya</p>


                    </div>
                    
                    <div className="grid grid-cols-2 gap-5">
                        <div className="space-y-5">
                            <Input size='lg' labelLeft='Nama' bordered fullWidth onChange={({ target }) => setForm({ ...form, nama: target.value })} />
                            <Input size='lg' labelLeft='Email' type='email' bordered fullWidth onChange={({target}) => setForm({ ...form, email: target.value })} />
                            <Input size='lg' labelLeft={<span className="whitespace-nowrap">No telp</span>} type='number' bordered fullWidth onChange={({target}) => setForm({ ...form, noTelp: target.value })} />
                            <Input size='lg' labelLeft='Alamat' bordered fullWidth onChange={({target}) => setForm({ ...form, alamat: target.value })} />
                        </div>
                        <div className="space-y-5">
                            <DatePicker size='large' placeholder="Tanggal Lahir" bordered allowClear className="w-full" onChange={(date_moment, date_string ) => setForm({ ...form, tanggal_lahir: date_string })} format="YYYY-MM-DD"/>
                            {isTambahToko ? (
                                <Input size='lg' labelLeft={<span className="whitespace-nowrap">Nama Toko</span>} bordered fullWidth  required onChange={({target}) => setForm({ ...form, toko: target.value })} />
                            ) : (
                                <div className="my-1">
                                    <Select size='large' allowClear className="w-full" clearIcon onChange={HandleChangeToko} placeholder='Pilih Toko Anggota' >
                                        {listToko?.map((item) => (
                                            <Select.Option value={item}>{item}</Select.Option>
                                        ))}
                                        <Select.Option value='tambah'>Toko kamu belum terdaftar? buat baru</Select.Option>
                                    </Select>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="w-full  flex justify-end">
                        <Button type='submit'>
                            {loadingSubmit  ? <Loading size='sm' color='white' /> : 'Submit'}
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    )
}