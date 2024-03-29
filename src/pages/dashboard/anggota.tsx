import DashboardLayout from "@base/src/components/dashboardLayout";
import { Button, Input, Loading, Tooltip } from "@nextui-org/react";
import { AiOutlinePlus, AiFillDelete, AiFillEdit, AiOutlineQrcode } from 'react-icons/ai'
import { DatePicker, Drawer, Modal, Popconfirm, Radio, Select, Table, Tag } from 'antd';
import { Fragment, useEffect, useRef, useState } from "react";
import { FcSearch } from 'react-icons/fc'
import { IoSaveSharp } from 'react-icons/io5'
import { MdModeEdit } from 'react-icons/md'
import axios from "axios";
import { toast } from "react-toastify";
import moment, { Moment } from "moment";
import {QRCodeCanvas} from 'qrcode.react';
import Head from "next/head";
import CsvDownloader from 'react-csv-downloader';

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
        toko: ''
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
            title: (
                <Tooltip content='editable column status'>
                    <span className="flex">
                        Status
                        <MdModeEdit size={10} className='ml-2 mt-2' />
                    </span>
                </Tooltip>
            ),
            render: (text, record) => <RenderStatusTable record={record} mutate={RefreshDataAnggota} />
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

                const HandleDeleteAnggota = async () => {
                    await axios.delete('/api/anggota', { params: { uniq_id : record?._id }})
                        .then(res => {
                            RefreshDataAnggota()
                            toast.success(res?.data?.msg, { position: toast.POSITION.TOP_CENTER })
                        }).catch(err => {
                            toast.error(err?.response?.data?.msg, { position: toast.POSITION.TOP_CENTER })
                        })
                }

                const HandleEditAnggota = () => {
                    setDataToEdit(record)
                    setDrawer(true)
                }   
                
                return (
                    <div className="flex items-center space-x-2">
                        <AiFillEdit className="text-blue-500 text-lg cursor-pointer" onClick={HandleEditAnggota} />
                        <Popconfirm placement='topLeft' title='apakah anda yakin?' onConfirm={HandleDeleteAnggota} okText='Ya' cancelText='Batal'>
                            <AiFillDelete className="text-red-500 text-lg cursor-pointer" />
                        </Popconfirm>
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
            toko: ''
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
            <DashboardLayout>
                <Drawer 
                    title='Tambah/Ubah Anggota'
                    placement='right'
                    onClose={() => setDrawer(false)}
                    open={drawer}
                >
                    <DrawerAddAnggota 
                        defaultData={dataToEdit}
                        mutate={RefreshDataAnggota}
                        listToko={listToko} 
                        open={drawer} 
                        onClose={() => setDrawer(false)} 
                    />
                </Drawer>
                

                <div className="p-5 z-0">
                    <p className="text-2xl font-semibold">Daftar Anggota</p>
                    <div className="lg:flex items-center justify-between my-5">
                        <div>
                            <p>filter</p>
                            <div className="space-x-3 lg:flex items-center">
                                <div className="flex items-center space-x-3">
                                    <Input 
                                        placeholder="cari nama/email.."
                                        contentRight={<FcSearch />}
                                        onChange={e => HandleFilter('search', e.target.value)}
                                    />
                                    <Select placeholder='toko' allowClear onClear={() => HandleFilter('toko', '')} className="w-40" onChange={val => HandleFilter('toko', val)}>
                                        {listToko?.map(item => (
                                            <Select.Option value={item}>{item}</Select.Option>
                                        ))}
                                    </Select>
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
                        <Button  onClick={() => setDrawer(true)} icon={<AiOutlinePlus />}>Tambah Anggota</Button>
                    </div>
                    <div className="mt-10 shadow">
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

            </DashboardLayout>
        </Fragment>
    )
}

const DrawerAddAnggota = ({ open, listToko, onClose, mutate, defaultData }) => {
    const initialForm = {
        nama: '',
        email: '',
        noTelp: '',
        alamat: '',
        tanggal_lahir: moment('1980-01-01').format('YYYY-MM-DD'),
        toko: ''
    }
    const [ form, setForm ] = useState({
        ...initialForm
    })
    const [ loadingSubmit, setLoadingSubmit ] = useState(false)
    const [ isTambahToko, setTambahToko ] = useState(false)
    const HandleChangeToko = (val) => {
        if (val === 'tambah'){
            setTambahToko(true)
            setForm({ ...form, toko: '' })
        }else{
            setForm({ ...form, toko: val })
        }
    }
    useEffect(() => {
        if (!open){
            setTambahToko(false)
            setForm(initialForm)
        }else{
            if (defaultData){
                setForm({ ...defaultData })
            }
        }
    },[open])

    const SubmitForm = async e => {
        e.preventDefault()
        setLoadingSubmit(true)
        if (defaultData){
            UpdateData()
        }else{
            CreateData()
        }
    }

    const UpdateData = async () => {
        await axios.put('/api/anggota', form, { params: { uniq_id: defaultData?._id } })
        .then(res => {
            toast.success(res?.data?.msg, { position: toast.POSITION.TOP_CENTER })
            mutate()
            onClose()
        }).catch(err => {
            toast.error(err?.data?.msg, { position: toast.POSITION.TOP_CENTER })
        }).finally(() => {
            setLoadingSubmit(false)
        })
    }

    const CreateData = async () => {
        await axios.post('/api/anggota', form)
        .then(res => {
            toast.success(res?.data?.msg, { position: toast.POSITION.TOP_CENTER })
            mutate()
            onClose()
        }).catch(err => {
            console.log(err)
            toast.error(err?.data?.msg, { position: toast.POSITION.TOP_CENTER })
        }).finally(() => {
            setLoadingSubmit(false)
        })
    }

    const GetDefaultDate = () => {

        let res:any = form.tanggal_lahir ? moment(form.tanggal_lahir, 'YYYY-MM-DD') : undefined

        return res
    }
    
    return (
        <form onSubmit={SubmitForm}>
            <Input 
                label='Nama' 
                fullWidth 
                placeholder="masukan nama anggota" 
                required
                onChange={({target}) => setForm({ ...form, nama: target.value })}
                value={form.nama}
            />
            <Input 
                label='Email' 
                fullWidth 
                placeholder="masukan email anggota" 
                required
                onChange={({target}) => setForm({ ...form, email: target.value })}
                value={form.email}
            />
            <Input 
                label='No Telp' 
                fullWidth 
                placeholder="masukan no telp anggota" 
                required
                onChange={({target}) => setForm({ ...form, noTelp: target.value })}
                value={form.noTelp}
            />
            <Input 
                label='Alamat' 
                fullWidth 
                placeholder="masukan alamat tempat tinggal" 
                required
                onChange={({target}) => setForm({ ...form, alamat: target.value })}
                value={form.alamat}
            />
            <div className='my-1'>
                <p>Tanggal Lahir</p>
                <DatePicker
                    className="w-full"
                    onChange={(date_moment, date_string ) => console.log(date_moment)}
                    format="YYYY-MM-DD"
                    value={GetDefaultDate()}
                />
            </div>
            {isTambahToko ? (
                <Input 
                    label='Toko'
                    fullWidth
                    placeholder="masukan nama toko"
                    required
                    onChange={({target}) => setForm({ ...form, toko: target.value })}
                    value={form.toko}
                />
            ) : (
                <div className="my-1">
                    <p>Toko</p>
                    <Select className="w-full" clearIcon  placeholder='Pilih Toko Anggota' onChange={HandleChangeToko} value={form.toko}>
                        {listToko?.map((item) => (
                            <Select.Option value={item}>{item}</Select.Option>
                        ))}
                        <Select.Option value='tambah'>Tambah Toko Baru</Select.Option>
                    </Select>
                </div>
            )}

            <div className="absolute bottom-0 flex justify-end w-full">
                <Button type='submit' icon={<IoSaveSharp />} className="w-1/2 mb-5 mr-10">
                    {loadingSubmit ? <Loading color='white' /> : 'Simpan'}
                </Button>
            </div>
        </form>
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

const RenderStatusTable = ({ record, mutate }) => {

    const [ openModal, setOpenModal ] = useState(false)
    const [ selectedValue,setSelectedValue ] = useState(record?.status)
    const [ loadingSubmit, setLoadingSubmit ] = useState(false)

    const colorStatus = {
        'Pending': 'yellow',
        'Aktif': 'blue',
        'Tidak aktif': 'red',
        '': 'red'
    }

    const HandleSubmit = async () => {
        setLoadingSubmit(true)
        await axios.put('/api/anggota/status', { status: selectedValue }, { params: { uniq_id: record?._id } })
            .then(res => {
                toast.success(res?.data?.message)
                setOpenModal(false)
                mutate()
            }).catch(err => {
                toast.error(err?.response?.message)
            })
        setLoadingSubmit(false)
    }

    return (
        <Fragment>

            <Modal
                open={openModal}
                title={`Ubah status anggota ${record?.nama}`}
                onCancel={() => setOpenModal(false)}
                okText='Submit'
                confirmLoading={loadingSubmit}
                onOk={HandleSubmit}
            >
                <div>
                    <p>Status Anggota :</p>
                    <Radio.Group name='status anggota' onChange={({ target }) => setSelectedValue(target.value)}>
                        <Radio value='Aktif'>Aktif</Radio>
                        <Radio value='Tidak aktif'>Tidak aktif</Radio>
                        <Radio value='Berhenti'>Berhenti</Radio>
                    </Radio.Group>

                    {record?.berhenti_pada && (
                        <p className="mt-10 italic underline">berhenti pada {moment(record?.berhenti_pada).format('LLLL')}</p>
                    )}
                </div>
            </Modal>

            <Tag 
                color={colorStatus[record?.status] || 'red'}
                className='cursor-pointer'
                onClick={() => setOpenModal(true)}
            >
                {record.status || 'Tidak Aktif'}
            </Tag>
        </Fragment>
    )
    
}