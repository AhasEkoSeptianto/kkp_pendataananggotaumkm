import DashboardLayout from "@base/src/components/dashboardLayout";
import { Tabs, message, Upload, UploadProps } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Button, Input, Loading } from "@nextui-org/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Image } from 'antd';
import { toast } from "react-toastify";

export default function DefaultAnggotaPage(){
    return (
        <DashboardLayout>
            <div className="m-10 shadow p-5">
                <Tabs>
                    <Tabs.TabPane tab="Profile" key="1">
                        Content of Tab Pane 1
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Tanda Tangan Ketua/Kepemilikan" key="2">
                        <UploadTandaTangan />
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </DashboardLayout>
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
        axios.get('/api/ttd')
            .then(res => {
                setDataImg(res?.data?.data?.[0])
            })
    },[])

      

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