import DashboardLayout from "@base/src/components/dashboardLayout";
import { Tabs, message, Upload, UploadProps } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Button, Input, Loading } from "@nextui-org/react";
import { Fragment, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Image } from 'antd';
import { toast } from "react-toastify";
import Head from "next/head";
import { VscSaveAll } from 'react-icons/vsc'
import { GiCancel } from 'react-icons/gi'
import { AiTwotoneEdit } from 'react-icons/ai'
import Cookies from "js-cookie";

export default function DefaultAnggotaPage(){
    return (
        <Fragment>
            <Head>
                <title>Setting</title>
            </Head>
            <DashboardLayout>
                <div className="m-10 shadow p-5">
                    <Tabs>
                        <Tabs.TabPane tab="Profile" key="1">
                            <ProfileSetting />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Tanda Tangan Ketua/Kepemilikan" key="2">
                            <UploadTandaTangan />
                        </Tabs.TabPane>
                    </Tabs>
                </div>
            </DashboardLayout>
        </Fragment>
    )
}

const ProfileSetting = () => {

    const [ form, setForm ] = useState({
        _id: '',
        profile_picture: '',
        username: '',
        password: '',
        confirm_password: ''    
    })
    const [ oldData, setOldData ] = useState({
        _id: '',
        profile_picture: '',
        username: '',
        password: '',
        confirm_password: ''
    })
    const [ showSaveBtn, setShowSaveBtn ] = useState(false)
    const [ loadingUpdate, setLoadingUpdate ] = useState(false)
    const refInputFile = useRef(null)

    useEffect(() => {
        GetData()
    },[])
    
    const GetData = async () => {
        axios.get('/api/profile')
            .then(res => {
                let { _id, username, password, profile_picture } = res?.data?.data?.[0]
                setForm({ ...form, _id: _id, username: username, profile_picture: profile_picture })
                setOldData({ _id: _id, username: username, profile_picture: profile_picture, password: password, confirm_password: '' })
            })
            .catch(err => {
                console.log(err)
            })
    }


    const HandleChangeProfilePicture = (e) => {
        let file = e.target.files[0]
        var reader:any = new FileReader();
            
        reader.readAsBinaryString(file);

        reader.onload = function() {
            let base64Img = 'data:image/png;base64, ' + btoa(reader.result)
            setForm({ ...form, profile_picture: base64Img })
            
        };
        reader.onerror = function() {
            console.log('there are some problems');
        };   
    }
    const SubmitForm = async () => {
        setLoadingUpdate(true)
        
        if (form.password || form.confirm_password){
            if (form.password !== form.confirm_password){
                return toast.error('Password not same', { position: toast.POSITION.TOP_CENTER })
            }
        }

        var data = {
            username: form.username,
            profile_picture: form.profile_picture,
            password: form?.password ? form.password : oldData.password
        }

        await axios.put('/api/profile', data, { params: {uniq_id: form._id} })
            .then(async res => {
                toast.success(res?.data?.msg, { position: toast.POSITION.TOP_CENTER })
                GetData()
                setShowSaveBtn(false)
                
            })
            .catch(err => {
                toast.error(err?.response?.data?.msg, { position: toast.POSITION.TOP_CENTER })
            })
        setLoadingUpdate(false)
    }

    return (
        <Fragment>
            <div className="lg:flex items-start space-x-5 p-5">
                <div className="w-36">
                    <Image 
                        preview={false}
                        className='cursor-pointer'
                        // onClick={() => refInputFile.current?.click()}
                        src={oldData.profile_picture}
                    />
                    <input type='file' className="hidden" ref={refInputFile} onChange={HandleChangeProfilePicture} />
                </div>
                <div className="lg:flex items-start">
                    <div className="flex flex-col space-y-2">
                        <Input onChange={(e) => setForm({ ...form, username: e.target.value })} value={form.username} underlined labelLeft='username' />
                        <Input.Password placeholder="default use old password" onChange={(e) => setForm({ ...form, password: e.target.value })} value={form.password} underlined labelLeft='password' />
                        <Input.Password placeholder="default use old password" onChange={(e) => setForm({ ...form, confirm_password: e.target.value })} value={form.confirm_password} underlined labelLeft='confirm password' />
                        {showSaveBtn && (
                            <Input onChange={(e) => setForm({ ...form, profile_picture: e.target.value })} value={form.profile_picture} underlined labelLeft='link profile picture' placeholder="type link profile picture" />
                        )}
                    </div>
                    {showSaveBtn ? (
                        <div className=" ml-5  space-y-2 mt-3 lg:mt-0">
                            <Button  aria-labelledby="123123" onPress={SubmitForm} icon={<VscSaveAll />} className='bg-blue-500' size='sm'>
                                {loadingUpdate ? <Loading color='white' size='sm' /> : 'Simpan Profile'}
                            </Button>
                            <Button aria-labelledby="123123" onPress={() => {
                                setForm({...oldData, password: ''})
                                setShowSaveBtn(false)
                            }} icon={<GiCancel />} className='bg-red-500' size='sm'>Batal</Button>
                        </div>
                    ): (
                        <div className="ml-5 mt-3 lg:mt-0">
                            <Button aria-labelledby="123123" onPress={() => setShowSaveBtn(true)} icon={<AiTwotoneEdit />} className='bg-blue-500' size='sm'>Edit</Button>
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    )
}


const UploadTandaTangan  = () => {
    
    const { Dragger } = Upload;
    let [ dataImg, setDataImg ] = useState(null)
    let [ updatedImgPreview, setUpdatedImgPreview ] = useState('')
    const [ form, setForm ] = useState({
        nama: ''
    })
    const [ loadingUpdate, setLoadingUpdate ] = useState(false)
    useEffect(() => {
        GetTTD()
    },[])


    const GetTTD = async () => {
        axios.get('/api/ttd')
            .then(res => {
                setDataImg(res?.data?.data?.[0])
            })
    }
      

    const props: UploadProps = {
        name: 'file',
        multiple: false,
        showUploadList: false,
        accept: 'image/png' ,
        onChange(info) {
            var reader:any = new FileReader();
            
            reader.readAsBinaryString(info?.file.originFileObj);

            reader.onload = function() {
                let base64Img = 'data:image/png;base64, ' + btoa(reader.result)
                setUpdatedImgPreview(base64Img)
            };
            reader.onerror = function() {
                console.log('there are some problems');
            };

        },
        onDrop(e) {
          console.log('Dropped files', e.dataTransfer.files);
        },
      };

    const UpdateFormTtd = async () => {
        setLoadingUpdate(true)
        await axios.put('/api/ttd', { img_base64: updatedImgPreview, nama: form.nama },  { params: { uniq_id: dataImg?._id } })
            .then(res => {
                toast.success(res?.data?.msg, { position: toast.POSITION.TOP_CENTER })
            })
            .catch(err => {
                toast.error(err?.response?.data?.msg, { position: toast.POSITION.TOP_CENTER })
            })

        setLoadingUpdate(false)
    }
    
    return (
        <div className="">
            <div className="mx-5 my-10 flex flex-col items-center justify-center">
                <Image 
                    src={updatedImgPreview ? updatedImgPreview : dataImg?.img_base64 }
                    width={200}
                />
                <p className="text-lg ">atn. {form.nama ? form.nama : dataImg?.nama}</p>
            </div>

            <div>
                <p>Edit TTD.</p>
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                        band files
                    </p>
                </Dragger>
                <div className="my-8 w-full lg:w-1/4">
                    <Input onChange={(e ) => setForm({ ...form, nama: e.target.value })} fullWidth labelPlaceholder="Nama" />
                </div>
                <div className="my-5">
                    <Button onClick={UpdateFormTtd}>
                        {loadingUpdate ? <Loading color='white' /> : 'Perbarui'}
                    </Button>
                </div>
            </div>
        </div>
    )
}