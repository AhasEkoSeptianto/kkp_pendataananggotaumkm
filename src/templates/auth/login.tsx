import { Fragment, useEffect } from "react";
import React, { useState } from "react";
import Image from "next/image";
import LogoMerchant from "@base/src/asset/img/merchant.png"
import { Input, Button, Loading } from "@nextui-org/react";
import Axios from 'axios'
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function LoginDefaultPage(){

    const [ form, setForm ] = useState({
        username: '',
        password: ''
    })

    const [ loadingSubmit, setLoadingSubmit ] = useState(false)

    const Submit = async (e:any) => {
        e.preventDefault()
        setLoadingSubmit(true)
        Axios.post('/api/login', form)
            .then(res => {
                Cookies.set('token', res?.data?.token)
                window.location.href= '/dashboard'
            })
            .catch(err => {
                toast.error(err?.response?.data?.msg, { position: toast.POSITION.TOP_CENTER })
            }).finally(() => {
                setLoadingSubmit(false)
            })
    }

    useEffect(() => {
        toast.info('use "superadmin:abc123" for testing')
    },[])

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
                
                <form className="my-20 w-10/12 lg:w-1/2 space-y-10 bg-white z-20 p-10 rounded" onSubmit={Submit}>
                    <div className="mb-5">
                        <p className="text-2xl font-semibold text-center">Welcome Back</p>
                        <p className="text-sm text-center">Please login to your account</p>
                    </div>
                    <Input 
                        onChange={e => setForm({ ...form, username: e.target.value })} 
                        name="Username" 
                        fullWidth 
                        underlined 
                        labelPlaceholder="Username" 
                    />
                    <Input.Password
                        onChange={e => setForm({ ...form, password: e.target.value })}
                        fullWidth 
                        underlined 
                        labelPlaceholder="Password" 
                    />
                    <Button type='submit' style={{ width: '100%' }}>
                        {loadingSubmit ? <Loading size='sm' color='white' /> : 'Submit' }
                    </Button>
                </form>
            </div>
        </div>
    )
}