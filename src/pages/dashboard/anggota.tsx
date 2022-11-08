import DashboardLayout from "@base/src/components/dashboardLayout";
import { Button, Input } from "@nextui-org/react";
import { AiOutlinePlus } from 'react-icons/ai'
import { Drawer, Modal, Select } from 'antd';
import { useEffect, useState } from "react";
import { CgArrowsExchangeAlt } from 'react-icons/cg'

export default function DefaultAnggotaPage(){

    const [ drawer, setDrawer ] = useState(false)

    return (
        <DashboardLayout>
            
            <Drawer 
                title='Tambah Anggota'
                placement='right'
                onClose={() => setDrawer(false)}
                open={drawer}
            >
                <DrawerAddAnggota open={drawer} />
            </Drawer>

            <div className="p-5 z-0">
                <p className="text-2xl font-semibold">Daftar Anggota</p>
                <div className="flex items-center justify-between my-5">
                    <div>
                        <p>filter</p>
                    </div>
                    <Button  onClick={() => setDrawer(true)} icon={<AiOutlinePlus />}>Tambah Anggota</Button>
                </div>
            </div>
        </DashboardLayout>
    )
}

const DrawerAddAnggota = ({ open }) => {
    const [ form, setForm ] = useState({
        nama: '',
        email: '',
        noTelp: '',
        toko: ''
    })
    const [ isTambahToko, setTambahToko ] = useState(false)
    const HandleChangeToko = (val) => {
        if (val === 'tambah'){
            setTambahToko(true)
        }
    }
    useEffect(() => {
        if (!open){
            setTambahToko(false)
        }
    },[open])
    return (
        <form>
            <Input 
                label='Nama' 
                fullWidth 
                placeholder="masukan nama anggota" 
            />
            <Input 
                label='Email' 
                fullWidth 
                placeholder="masukan email anggota" 
            />
            <Input 
                label='No Telp' 
                fullWidth 
                placeholder="masukan no telp anggota" 
            />
            {isTambahToko ? (
                <Input 
                    label='Toko'
                    fullWidth
                    placeholder="masukan nama toko"
                />
            ) : (
                <div className="my-1">
                    <p>Toko</p>
                    <Select className="w-full" clearIcon  placeholder='Pilih Toko Anggota' onChange={HandleChangeToko}>
                        <Select.Option value='tambah'>Tambah Toko Baru</Select.Option>
                    </Select>
                </div>
            )}
        </form>
    )
}