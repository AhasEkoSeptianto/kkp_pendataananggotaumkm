import { Avatar, Divider, Grid } from '@nextui-org/react';
import { RiAdminFill } from 'react-icons/ri'
import { BiLogOut, BiLogOutCircle } from 'react-icons/bi'
import { AiFillHome, AiFillSetting } from 'react-icons/ai'
import { HiUsers } from 'react-icons/hi'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Fragment } from 'react';

const ListMenu = [
    {
        label: 'Home',
        link: '/dashboard',
        icon: <AiFillHome className='text-white text-xl' />
    },
    {
        label: 'Anggota',
        link: '/dashboard/anggota',
        icon: <HiUsers className='text-white text-xl' />
    },
    {
        label: 'Setting',
        link: '/dashboard/setting',
        icon: <AiFillSetting className='text-white text-xl' />
    }
]

export default function Sidebar({ Logout }){

    const router = useRouter()
    
    return (
        <div className="bg-blue-secondary min-h-screen relative shadow-lg">
            <div className='py-10 flex flex-col items-center justify-center'>
                <div className='p-4 bg-gray-600 rounded-full'>
                    <RiAdminFill className='text-5xl text-white' />
                </div>
                <p className='text-white mt-2 font-semibold'>super admin</p>
            </div>

            <Divider className='bg-gray-500 h-.5 mb-2'  />

            <div>
                {ListMenu?.map((item, idx) => (
                    <Link href={item?.link} key={idx}>
                        <div className={`py-3 px-5 cursor-pointer flex items-center space-x-4 ${router.pathname === item?.link ? 'bg-blue-darkSecondary' : 'hover:bg-blue-darkSecondary'}`}>
                            {item?.icon}
                            <div className='flex items-center justify-center'>
                                <p className='text-white my-auto'>{item?.label}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className='absolute bottom-0 w-full'>
                <div className={`py-3 px-5 mx-0.5 cursor-pointer flex items-center justify-center space-x-4 border border-darkSecondary`} onClick={Logout}>
                    <BiLogOut className='text-white text-xl' />
                    <p className='text-white my-auto'>Logout</p>
                </div>
            </div>

        </div>
    )
}

export function SidebarMobile(){
    
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