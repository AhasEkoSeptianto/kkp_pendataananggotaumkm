import { Avatar, Divider, Grid } from '@nextui-org/react';
import { RiAdminFill } from 'react-icons/ri'
import { BiLogOut, BiLogOutCircle } from 'react-icons/bi'
import { AiFillHome, AiFillSetting } from 'react-icons/ai'
import { HiUsers } from 'react-icons/hi'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Image } from 'antd';

const ListMenu = [
    {
        label: 'Home',
        link: '/toko/dashboard',
        icon: <AiFillHome className='text-white text-xl' />
    },
    {
        label: 'Anggota',
        link: '/toko/dashboard/anggota',
        icon: <HiUsers className='text-white text-xl' />
    },
    // {
    //     label: 'Setting',
    //     link: '/dashboard/setting',
    //     icon: <AiFillSetting className='text-white text-xl' />
    // }
]

export default function SidebarToko({ Logout }){

    const router = useRouter()
    
    const [ users, setUsers ] = useState({
        nama: '',
        toko: ''
    })
    useEffect(() => {
        setUsers({ 
            nama: Cookies.get('nama'),
            toko: Cookies.get('toko') 
        })
    },[])
    
    return (
        <div className="bg-blue-secondary min-h-screen relative shadow-lg hidden lg:block col-span-2">
            <div className='py-10 flex flex-col items-center justify-center'>
                <p className='text-white mt-2 text-2xl font-semibold'>{users.toko}</p>
                <p className='text-white mt-2 font-semibold'>selamat datang {users.nama}</p>
            </div>

            <Divider className='bg-gray-500 h-.5 mb-2'  />

            <div>
                {ListMenu?.map((item, idx) => (
                    <Link href={item?.link} key={idx}>
                        <div className={`py-3 px-5 cursor-pointer flex items-center space-x-4 hover:border-l-4 hover:ml-1 hover:bg-red-500 ${router.pathname === item?.link ? 'border-l-4 ml-1' : ''}`}>
                            {item?.icon}
                            <div className='flex items-center justify-center'>
                                <p className='text-white my-auto'>{item?.label}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

        </div>
    )
}

export function SidebarMobileToko(){
    
    const router = useRouter()

    return (
        <Fragment>
            <div className="absolute w-screen h-screen bg-gray-800 bg-opacity-80 flex flex-col items-center justify-center" style={{ zIndex: 1400 }}>
                {ListMenu?.map((item, idx) => (
                    <Link href={item?.link} key={idx}>
                        <div className={`py-3 px-5 cursor-pointer flex items-center space-x-4`}>
                            <p className={`text-white font-semibold text-2xl`}>{item?.label}</p>
                        </div>
                    </Link>
                ))}           
            </div>
        </Fragment>
    )
}