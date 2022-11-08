import { Fragment } from "react";
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
                // window.location.href= '/dashboard'
            })
            .catch(err => {
                console.log(err)
                toast.error(err?.response?.data?.msg, { position: toast.POSITION.TOP_CENTER })
            }).finally(() => {
                setLoadingSubmit(false)
            })
    }

    return (
        <div className="grid grid-cols-2 min-h-screen">
            <div className="bg-blue-primary flex flex-col item-center justify-center">
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
                <div>
                    <p className="text-2xl font-semibold text-center">Welcome Back</p>
                    <p className="text-xl">Please login to your account</p>
                </div>
                <form className="my-20 w-1/2 space-y-10" onSubmit={Submit}>
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
                        {loadingSubmit ? <Loading /> : 'Submit' }
                    </Button>
                </form>
            </div>
        </div>
    )
}