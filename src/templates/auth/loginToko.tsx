import { Fragment, useEffect } from "react";
import React, { useState } from "react";
import Image from "next/image";
import LogoMerchant from "@base/src/asset/img/merchant.png"
import { Input, Button, Loading } from "@nextui-org/react";
import Axios from 'axios'
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function LoginDefaultPageToko(){

    const [ form, setForm ] = useState({
        ID: '',
    })

    const [ loadingSubmit, setLoadingSubmit ] = useState(false)

    const Submit = async (e:any) => {
        e.preventDefault()
        setLoadingSubmit(true)
        Axios.post('/api/toko/login', form)
            .then(res => {
                const { token } = res?.data
                const { alamat, email, nama, noTelp, status, toko } = res?.data?._doc
                console.log(res?.data)
                Cookies.set('token', token)
                Cookies.set('alamat', alamat)
                Cookies.set('email', email)
                Cookies.set('nama', nama)
                Cookies.set('noTelp', noTelp)
                Cookies.set('toko', toko)
                
                window.location.href= '/toko/dashboard'
            })
            .catch(err => {
                toast.error(err?.response?.data?.msg, { position: toast.POSITION.TOP_CENTER })
            }).finally(() => {
                setLoadingSubmit(false)
            })
    }


    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
            <div className="bg-gradient-to-br from-primaryToko to-red-500 hidden lg:flex flex-col item-center justify-center">
                <p className="text-3xl text-center text-white">Kuliner Taman Harapan Baru</p>
                <div className="mx-auto mt-10">
                    <Image 
                        alt=""
                        src={LogoMerchant}
                    />
                </div>
            </div>
            <div className="flex flex-col items-center justify-center">
                <div className="blur-lg lg:hidden absolute bg-gradient-to-br from-primaryToko to-red-500 w-screen h-screen flex items-center justify-center">
                    <Image alt='' src={LogoMerchant} />
                </div>
                
                <form className="my-20 w-10/12 lg:w-1/2 space-y-10 bg-white z-20 p-10 rounded" onSubmit={Submit}>
                    <div className="mb-5">
                        <p className="text-2xl font-semibold text-center">Selamat Datang</p>
                        <p className="text-sm text-center">Tolong isikan UNIQUE ID anda untuk masuk</p>
                    </div>
                    <Input 
                        onChange={e => setForm({ ...form, ID: e.target.value })} 
                        name="UniqID" 
                        fullWidth 
                        underlined 
                        labelPlaceholder="Unique ID" 
                    />
                    <Button type='submit' style={{ width: '100%' }}>
                        {loadingSubmit ? <Loading size='sm' color='white' /> : 'Submit' }
                    </Button>
                </form>
            </div>
        </div>
    )
}