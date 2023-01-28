import { Link } from '@nextui-org/react'
import axios from 'axios'
import { Fragment, useEffect, useState } from 'react'
import { FiChevronsRight } from 'react-icons/fi'
import { FaUsers } from 'react-icons/fa'
import { BsShop } from 'react-icons/bs'
import { Image } from 'antd'
import { Area } from '@ant-design/plots';
import moment from 'moment'
import Calendar from 'react-calendar';
import Head from 'next/head'
import DashboardTokoLayout from '@base/src/components/dashboardLayout/dashboardToko'
import Cookies from 'js-cookie'

export default function DashboardDefaultPage(){

    const [ summaryData, setSummaryData ] = useState(null)
    const [ ttd, setTtd ] = useState(null)
    useEffect(() => {
        axios.get('/api/toko/summary', { params: { toko: Cookies.get('toko') } })
            .then(res => {
                setSummaryData(res?.data?.data)
            })
    },[])
    
    return (
        <Fragment>
            <Head>
                <title>Dashboard</title>
            </Head>
            <DashboardTokoLayout>
                <div className='p-10'>
                    <div className='space-y-2 lg:space-y-0 lg:grid grid-cols-2 gap-5 '>
                        <div className='border shadow rounded p-5 relative bg-white'>
                            <p className='font-semibold'>Total {summaryData?.totalAnggota} Anggota</p>
                            <FaUsers className='text-4xl' />
                            <div className='absolute top-0 right-0 p-2'>
                                <Link href='/toko/dashboard/anggota'>
                                    <div className='flex items-center justify-center'>
                                        <p className='my-auto'>Lihat Detail</p>
                                        <FiChevronsRight color='blue' />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>

            </DashboardTokoLayout>
        </Fragment>
    )
}
