import DashboardLayout from '@base/src/components/dashboardLayout'
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
                <div className='space-y-2 lg:space-y-0 lg:grid grid-cols-3 gap-5 '>
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

                <div className='lg:grid grid-cols-12 my-10 p-5 gap-5'>
                    <div className='col-span-8'>
                        <GrafikShow />
                    </div>
                    <div className='col-span-4'>
                        <div className='m-10'>
                            <Calendar onChange={() => {}} />
                        </div>
                    </div>
                </div>

            </div>

        </DashboardLayout>
    )
}

const GrafikShow = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        asyncFetch();
    }, []);
    

    const asyncFetch = () => {
        axios.get('/api/grafikAnggota')
            .then(res => {
                let anggotaThisYears = res?.data?.data

                let monthList = [ 
                    moment().subtract(11, 'months')?.format('MMMM') , 
                    moment().subtract(10, 'months')?.format('MMMM') , 
                    moment().subtract(9, 'months')?.format('MMMM') , 
                    moment().subtract(8, 'months')?.format('MMMM') , 
                    moment().subtract(7, 'months')?.format('MMMM') , 
                    moment().subtract(6, 'months')?.format('MMMM') , 
                    moment().subtract(5, 'months')?.format('MMMM') , 
                    moment().subtract(4, 'months')?.format('MMMM') , 
                    moment().subtract(3, 'months')?.format('MMMM') , 
                    moment().subtract(2, 'months')?.format('MMMM') , 
                    moment().subtract(1, 'months')?.format('MMMM') , 
                    moment().format('MMMM') , 
                ]
                let makeData = []

                monthList?.forEach(item => {
                    makeData.push({
                        month: item,
                        value: anggotaThisYears?.filter(date => moment(date?.created_at)?.format('MMMM') === item)?.length
                    })
                })
                setData(makeData)

            })
    };

    // useEffect(() => {
    //     fetch('https://gw.alipayobjects.com/os/bmw-prod/360c3eae-0c73-46f0-a982-4746a6095010.json')
    //       .then((response) => response.json())
    //       .then((json) => console.log(json))
    //       .catch((error) => {
    //         console.log('fetch data failed', error);
    //       });
    // },[])

    const config = {
        data,
        xField: 'month',
        yField: 'value',
        xAxis: {
            range: [0, 1],
        },
        areaStyle: () => {
            return {
              fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
            };
          },
    };

    return (
        <div>
            <p className='text-center'>Grafik Anggota Bergabung {moment().subtract(1, 'y').format('YYYY')}/{moment().format('YYYY')}</p>
            <Area {...config} />
        </div>
    )
}