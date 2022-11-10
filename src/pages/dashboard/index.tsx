import DashboardLayout from '@base/src/components/dashboardLayout'
import { Link } from '@nextui-org/react'
import axios from 'axios'
import { Fragment, useEffect, useState } from 'react'
import { FiChevronsRight } from 'react-icons/fi'
import { FaUsers } from 'react-icons/fa'
import { BsShop } from 'react-icons/bs'
import { Image } from 'antd'

export default function DashboardDefaultPage(){

    const [ summaryData, setSummaryData ] = useState(null)
    const [ ttd, setTtd ] = useState(null)
    useEffect(() => {
        axios.get('/api/summary')
            .then(res => {
                setSummaryData(res?.data?.data)
            })
        axios.get('/api/ttd')
            .then(res => {
                setTtd(res?.data?.data)
            })
    },[])
    console.log(ttd)
    return (
        <DashboardLayout>
            <div className='p-10'>
                <div className='grid grid-cols-3 gap-5 '>
                    <div className='border shadow rounded p-5 relative'>
                        <p className='font-semibold'>Total {summaryData?.totalAnggota} Anggota</p>
                        <FaUsers className='text-4xl' />
                        <div className='absolute top-0 right-0 p-2'>
                            <Link href='/dashboard/anggota'>
                                <div className='flex items-center justify-center'>
                                    <p className='my-auto'>Lihat Detail</p>
                                    <FiChevronsRight color='blue' />
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className='border shadow rounded p-5 relative'>
                        <p className='font-semibold'>Total {summaryData?.toko?.length} Toko</p>
                        <BsShop className='text-4xl' />
                        <div className='absolute top-0 right-0 p-2'>
                            <Link href='/dashboard/anggota'>
                                <div className='flex items-center justify-center'>
                                    <p className='my-auto'>Lihat Detail</p>
                                    <FiChevronsRight color='blue' />
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className='border shadow rounded p-5 relative'>
                        <p className='font-semibold'>TTD atn.{ttd?.[0]?.nama}</p>
                        <div className='w-14 h-14 relative'>
                            <Image src={ttd?.[0]?.img_base64} />
                        </div>
                        <div className='absolute top-0 right-0 p-2'>
                            <Link href='/dashboard/setting'>
                                <div className='flex items-center justify-center'>
                                    <p className='my-auto'>Lihat Detail</p>
                                    <FiChevronsRight color='blue' />
                                </div>
                            </Link>
                        </div>
                    </div>
                    
                </div>
            </div>

        </DashboardLayout>
    )
}
