import { QRCodeCanvas } from "qrcode.react";
import Image from "next/image";
import axios from "axios";
import absoluteUrl from 'next-absolute-url'

export default function AnggotaCard({ anggota, ttd }){
    
    
    return (
        <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full lg:w-1/2 h-2/6 lg:h-3/6 shadow-lg border rounded-lg overflow-hidden" id='card_anggota'>
                <div className="bg-blue-primary w-full h-1/6 ">
                    <p className="text-white text-lg lg:text-3xl flex items-center justify-center h-full">UMKM Paguyuban THB</p>
                </div>
                <div className="grid grid-cols-12 p-5 h-4/6">
                    <div className="col-span-8">
                        <div className="flex items-center">
                            <p className="w-4/12 lg:w-2/12 text-sm lg:text-lg">Nama</p>
                            <p className="text-sm lg:text-lg">: {anggota?.nama}</p>
                        </div>
                        <div className="flex items-center">
                            <p className="w-4/12 lg:w-2/12 text-sm lg:text-lg">Email</p>
                            <p className="text-sm lg:text-lg">: {anggota?.email}</p>
                        </div>
                        <div className="flex items-center">
                            <p className="w-4/12 lg:w-2/12 text-sm lg:text-lg">No Telp</p>
                            <p className="text-sm lg:text-lg">: {anggota?.noTelp}</p>
                        </div>
                        <div className="flex items-center">
                            <p className="w-4/12 lg:w-2/12 text-sm lg:text-lg">Toko</p>
                            <p className="text-sm lg:text-lg">: {anggota?.toko}</p>
                        </div>
                        
                    </div>
                    <div className="col-span-4">
                        
                        <div className="hidden lg:flex items-center justify-center h-4/6">
                            <QRCodeCanvas value={window.location.href} size={120} />
                        </div>
                        <div className="lg:hidden flex items-center justify-center h-2/6">
                            <QRCodeCanvas value={window.location.href} size={50} />
                        </div>

                        <div className="flex flex-col items-center justify-center w-full">
                            <div className="relative w-10 h-10 mt-5 lg:mt-0 lg:w-20 lg:h-20">
                                <Image 
                                    src={ttd?.img_base64} 
                                    layout='fill'
                                    objectFit='contain'
                                />
                            </div>
                            <p className="text-xs whitespace-nowrap">atn. kepala paguyuban</p>
                        </div>
                    </div>
                </div>
                <div className="h-1/6 w-full flex items-end">
                    <div className="h-3/6 bg-blue-primary w-screen">
                        <p className="text-white flex items-center justify-center h-full">{window.location.origin}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

// This function gets called at build time
export async function getServerSideProps(context) {
    console.log(context)
    const { params, req   } = context
    let uniq_id = params?.user_id
    const { origin } = absoluteUrl(req)

    // Call an external API endpoint to get posts
    let data = await axios.get(origin +'/api/anggota/details?user_id=' + uniq_id)
    let ttd = await axios.get(origin + '/api/ttd')
    
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
      props: {
        anggota: data?.data?.data?.[0],
        ttd: ttd?.data?.data?.[0]
      },
    }
  }