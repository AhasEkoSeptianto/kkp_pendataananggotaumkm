import { Avatar, Grid } from '@nextui-org/react';
import { RiAdminFill } from 'react-icons/ri'
import { AiFillHome } from 'react-icons/ai'
import { HiUsers } from 'react-icons/hi'
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Sidebar(){

    const router = useRouter()
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
        }
    ]
    
    

    return (
        <div className="bg-blue-secondary min-h-screen">
            <div className='py-10 flex flex-col items-center justify-center'>
                <div className='p-4 bg-gray-600 rounded-full'>
                    <RiAdminFill className='text-5xl text-white' />
                </div>
                <p className='text-white mt-2 font-semibold'>super admin</p>
            </div>

            {ListMenu?.map((item, idx) => (
                <Link href={item?.link} key={idx}>
                    <div className={`py-3 px-5 cursor-pointer flex items-center space-x-4 ${router.pathname === item?.link ? 'bg-blue-darkSecondary' : 'hover:bg-blue-darkSecondary'}`}>
                        {item?.icon}
                        <p className='text-white'>{item?.label}</p>
                    </div>
                </Link>
            ))}

        </div>
    )
}