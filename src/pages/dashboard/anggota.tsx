import DashboardLayout from "@base/src/components/dashboardLayout";
import { Button, Input, Loading } from "@nextui-org/react";
import { AiOutlinePlus, AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { DatePicker, Drawer, Modal, Popconfirm, Select, Table } from 'antd';
import { useEffect, useState } from "react";
import { CgArrowsExchangeAlt } from 'react-icons/cg'
import { FcSearch } from 'react-icons/fc'
import { IoSaveSharp } from 'react-icons/io5'
import axios from "axios";
import { toast } from "react-toastify";

export default function DefaultAnggotaPage(){

    const [ drawer, setDrawer ] = useState(false)

    const [ listToko, setListToko ] = useState([])
    const [ listAnggota, setListAnggota ] = useState([])
    const [ loadingFetchAnggota, setLoadingFetchAnggota ] = useState(true)
    useEffect(() => {
        axios.get('/api/toko')
            .then(res => {
                setListToko(res?.data?.data)
            })
        
        axios.get('/api/anggota')
            .then(res => {
                setListAnggota(res?.data?.data)
            }).finally(() => {
                setLoadingFetchAnggota(false)
            })
    },[])

    const RefreshDataAnggota = () => {
        axios.get('/api/anggota')
            .then(res => {
                setListAnggota(res?.data?.data)
            })
    }
    

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
                
                return (
                    <div className="flex items-center space-x-2">
                        <AiFillEdit className="text-blue-500 text-lg cursor-pointer" />
                        <Popconfirm placement='topLeft' title='apakah anda yakin?' onConfirm={HandleDeleteAnggota} okText='Ya' cancelText='Batal'>
                            <AiFillDelete className="text-red-500 text-lg cursor-pointer" />
                        </Popconfirm>
                    </div>
                )
            }
        }
    ]

    return (
        <DashboardLayout>
            <Drawer 
                title='Tambah Anggota'
                placement='right'
                onClose={() => setDrawer(false)}
                open={drawer}
            >
                <DrawerAddAnggota mutate={RefreshDataAnggota} listToko={listToko} open={drawer} onClose={() => setDrawer(false)} />
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
                            />
                            <Select placeholder='toko' allowClear className="w-40">
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

const DrawerAddAnggota = ({ open, listToko, onClose, mutate }) => {
    const initialForm = {
        nama: '',
        email: '',
        noTelp: '',
        alamat: '',
        tanggal_lahir: '',
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
        }else{
            setForm({ ...form, toko: val })
        }
    }
    useEffect(() => {
        if (!open){
            setTambahToko(false)
            setForm(initialForm)
        }
    },[open])

    const SubmitForm = async e => {
        e.preventDefault()
        setLoadingSubmit(true)
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
            />
            <Input 
                label='Email' 
                fullWidth 
                placeholder="masukan email anggota" 
                required
                onChange={({target}) => setForm({ ...form, email: target.value })}
            />
            <Input 
                label='No Telp' 
                fullWidth 
                placeholder="masukan no telp anggota" 
                required
                onChange={({target}) => setForm({ ...form, noTelp: target.value })}
            />
            <Input 
                label='Alamat' 
                fullWidth 
                placeholder="masukan alamat tempat tinggal" 
                required
                onChange={({target}) => setForm({ ...form, alamat: target.value })}
            />
            <div className='my-1'>
                <p>Tanggal Lahir</p>
                <DatePicker 
                    className="w-full"
                    onChange={(date_moment, date_string ) => setForm({ ...form, tanggal_lahir: date_string })}
                />
            </div>
            {isTambahToko ? (
                <Input 
                    label='Toko'
                    fullWidth
                    placeholder="masukan nama toko"
                    required
                    onChange={({target}) => setForm({ ...form, toko: target.value })}
                />
            ) : (
                <div className="my-1">
                    <p>Toko</p>
                    <Select className="w-full" clearIcon  placeholder='Pilih Toko Anggota' onChange={HandleChangeToko}>
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