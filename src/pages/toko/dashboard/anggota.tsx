import { Button, Input } from "@nextui-org/react";
import {  AiOutlineQrcode } from 'react-icons/ai'
import { Modal, Table, Tag } from 'antd';
import { Fragment, useEffect, useRef, useState } from "react";
import { FcSearch } from 'react-icons/fc'
import axios from "axios";
import moment, { Moment } from "moment";
import {QRCodeCanvas} from 'qrcode.react';
import Head from "next/head";
import CsvDownloader from 'react-csv-downloader';
import DashboardTokoLayout from "@base/src/components/dashboardLayout/dashboardToko";
import Cookies from "js-cookie";

export default function DefaultAnggotaPage(){

    const [ drawer, setDrawer ] = useState(false)
    const [ dataToEdit, setDataToEdit ] = useState(null)
    const [ listToko, setListToko ] = useState([])
    const [ listAnggota, setListAnggota ] = useState([])
    const [ loadingFetchAnggota, setLoadingFetchAnggota ] = useState(true)
    const [ paramsGet, setParamsGet ] = useState({
        page: 1,
        limit: 10,
        search: '',
        toko: Cookies.get('toko') 
    })
    useEffect(() => {
        RefreshDataAnggota()
    },[])
    useEffect(() => {
        RefreshDataAnggota()
    },[paramsGet])

    const RefreshDataAnggota = () => {
        setLoadingFetchAnggota(true)
        axios.get('/api/anggota', { params: paramsGet })
            .then(res => {
                setListAnggota(res?.data?.data)
            })
            .finally(() => {
                setLoadingFetchAnggota(false)
            })

        axios.get('/api/toko')
            .then(res => {
                setListToko(res?.data?.data)
            })
        
    }

    useEffect(() => {
        if (!drawer){
            setDataToEdit(null)
        }
    },[drawer])
    

    const columnsTable = [
        {
            key: '_id',
            dataIndex: '_id',
            title: 'UNIQUE ID'
        },
        {
            key: 'nama',
            dataIndex: 'nama',
            title: 'Nama'
        },
        {
            key: 'email',
            dataIndex:'email',
            title: 'Email'
        },
        {
            key: 'noTelp',
            dataIndex:'noTelp',
            title: 'No. Telp'
        },
        {
            key: 'alamat',
            dataIndex:'alamat',
            title: 'Alamat'
        },
        {
            key: 'tanggal_lahir',
            dataIndex:'tanggal_lahir',
            title: 'Tanggal Lahir'
        },
        {
            key: 'toko',
            dataIndex:'toko',
            title: 'Toko'
        },
        {
            key: 'status',
            title: 'Status',
            render: (text, record) => {

                const colorStatus = {
                    'Pending': 'yellow',
                    'Aktif': 'blue',
                    'Tidak aktif': 'red',
                    '': 'red'
                }
            

                return <Tag 
                    color={colorStatus[record?.status] || 'red'}
                    className='cursor-pointer'
                >
                    {record.status || 'Tidak Aktif'}
                </Tag>
            }
        },
        {
            key: '_created',
            dataIndex: '_created',
            title: 'Daftar Pada',
            render: (text, record) => {
                return (
                    <p className="mt-5">{moment(record?.created_at).format('YYYY-MM-DD')}</p>
                )
            }
        },
        {
            key: '_action',
            dataIndex: '_action',
            title: 'Aksi',
            render: (text, record) => {
                
                return (
                    <div className="flex items-center space-x-2">
                        <RenderQRCode record={record} />
                    </div>
                )
            }
        }
    ]
    const HandleFilter = (key,value) => {
        setParamsGet({ ...paramsGet, [key]: value })
    }

      const [ listToExport, setListToExport ] = useState([])
      const columnHeaderExport = [
        {
            id: '_id',
            displayName: '_id'
        },
        {
            id: 'nama',
            displayName: 'Nama'
        },
        {
            id: 'noTelp',
            displayName: 'No Telephone'
        },
        {
            id: 'email',
            displayName: 'Email'
        },
        {
            id: 'tanggal_lahir',
            displayName: 'Tanggal Lahir'
        },
        {
            id: 'alamat',
            displayName: 'Alamat'
        },
        {
            id: 'toko',
            displayName: 'Toko'
        },
        {
            id: 'created_at',
            displayName: 'Created At'
        }
      ]

      useEffect(() => {
        axios.get('/api/anggota', { params: {
            page: 1,
            limit: 1000000,
            search: '',
            toko: Cookies.get('toko')
        }})
            .then(async res => {
                let resData = res?.data?.data
                setListToExport(resData)
            })
      },[])
      console.log(listAnggota)
      

    return (
        <Fragment>
            <Head>
                <title>Anggota</title>
            </Head>
            <DashboardTokoLayout>                

                <div className="p-5 z-0">
                    <p className="text-2xl font-semibold">Daftar Anggota Toko {Cookies.get('toko')}</p>
                    <div className="lg:flex items-center justify-between my-5">
                        <div>
                            <p>filter</p>
                            <div className="space-x-3 lg:flex items-center">
                                <div className="flex items-center space-x-3">
                                    <Input 
                                        placeholder="cari nama/email.."
                                        bordered
                                        contentRight={<FcSearch />}
                                        onChange={e => HandleFilter('search', e.target.value)}
                                    />
                                </div>

                                            
                                <div className="my-2">
                                    <Button className="bg-blue-500" size='xs'>
                                        <CsvDownloader
                                            filename="daftar_anggota_umkm_paguyuban"
                                            extension=".csv"
                                            columns={columnHeaderExport}
                                            datas={listToExport}
                                            text="Export Csv" />
                                    </Button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 shadow bg-white">
                        <Table 
                            dataSource={listAnggota}
                            columns={columnsTable}
                            loading={loadingFetchAnggota}
                            scroll={{ x: 500 }}
                            size='middle'
                            onChange={(e:any) => console.log(e)}
                            pagination={{
                                showSizeChanger: true,
                                showTotal: (total, range) =>
                                `${range[0]}-${range[1]} dari ${total} data`,
                            }}
                        />
                    </div>
                </div>

            </DashboardTokoLayout>
        </Fragment>
    )
}

const RenderQRCode = ({ record }) => {

    const [ openModal, setOpenModal ] = useState(false)
    let link = window.location.origin + '/anggota/' + record?._id
    const downloadQR = () => {
        const canvas:any = document.getElementById(`QR-Code-${record?._id}`);
        const pngUrl = canvas.toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `QR-Code_anggota_umkm_paguyuban_${record?.nama}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      };
    return (
        <Fragment>
            <Modal
                open={openModal}
                onCancel={() => setOpenModal(false)}
                okButtonProps={{ style: { display: 'none' } }}
                cancelButtonProps={{ style: { display: 'none' } }}
            >
                <p className="text-center font-semibold text-lg">QR-Code</p>
                <div className="flex flex-col items-center justify-center w-full my-10">
                    <p className="text-center">{link}</p>
                    <QRCodeCanvas id={`QR-Code-${record?._id}`} value={link} size={300}  />
                    <div className="mt-5">
                        <Button onClick={downloadQR}>Download</Button>
                    </div>
                </div>
            </Modal>
            <AiOutlineQrcode  onClick={() => setOpenModal(true)} className="text-green-500 text-lg cursor-pointer" />
        </Fragment>
    )
}
