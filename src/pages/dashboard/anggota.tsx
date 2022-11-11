import DashboardLayout from "@base/src/components/dashboardLayout";
import { Button, Input, Loading } from "@nextui-org/react";
import { AiOutlinePlus, AiFillDelete, AiFillEdit, AiOutlineQrcode } from 'react-icons/ai'
import { DatePicker, Drawer, Modal, Popconfirm, Select, Table } from 'antd';
import { Fragment, useEffect, useRef, useState } from "react";
import { CgArrowsExchangeAlt } from 'react-icons/cg'
import { FcSearch } from 'react-icons/fc'
import { IoSaveSharp } from 'react-icons/io5'
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";
import {QRCodeCanvas} from 'qrcode.react';

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

    return (
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
                <div className="flex items-center justify-between my-5">
                    <div>
                        <p>filter</p>
                        <div className="space-x-3 flex items-center">
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
            toast.error(err?.data?.msg, { position: toast.POSITION.TOP_CENTER })
        }).finally(() => {
            setLoadingSubmit(false)
        })
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
                    onChange={(date_moment, date_string ) => setForm({ ...form, tanggal_lahir: date_string })}
                    format="YYYY-MM-DD"
                    value={moment(form.tanggal_lahir, 'YYYY-MM-DD')}
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
                    <p>{link}</p>
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