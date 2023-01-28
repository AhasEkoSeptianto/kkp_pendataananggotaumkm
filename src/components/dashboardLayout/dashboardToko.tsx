import Sidebar, { SidebarMobile } from "./sidebar";
import Hamburger from 'hamburger-react'
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { BiLogOutCircle } from 'react-icons/bi'
import BRAND_NAME from "@utils/constants/brand";
import { RiLogoutCircleRLine } from 'react-icons/ri'
import SidebarToko, { SidebarMobileToko } from "./sidebarToko";

export default function DashboardTokoLayout(props:any){

    const [isOpenMobileMenu, setOpenMobileMenu] = useState(false)

    useEffect(() => {
        let token = Cookies.get('token')
        if (!token){
            window.location.href = '/toko'
        }
    },[])

    const Logout = () => {
        Cookies.remove('token')
        window.location.href = '/toko'
    }
    
    return (
        <div className="grid grid-cols-12 overflow-hidden">
            
            <SidebarToko Logout={Logout} />
            

            {isOpenMobileMenu && (
                <div className='absolute top-0 left-0 p-5 lg:hidden' style={{ zIndex: 1500 }}>
                    <BiLogOutCircle color='#DC143C' onClick={Logout} size={40}  />
                </div>
            )}

            <div className="absolute top-0 right-0 p-3 lg:hidden" style={{ zIndex: 1500 }}>
                <Hamburger color={isOpenMobileMenu ? 'white' : 'black'} toggled={isOpenMobileMenu} toggle={setOpenMobileMenu} />
            </div>
            
            {isOpenMobileMenu && (
                <SidebarMobileToko />
            )}
            
            <div className="bg-gray-100 min-h-screen col-span-12 lg:col-span-10">
                <div className="hidden lg:flex items-center justify-between bg-red-700 h-14 w-full">
                    
                    <p className="text-white my-auto ml-5 font-bold underline italic">SENTRA KULINER TAMAN HARAPAN BARU</p>
                    
                    <div className={`py-3 px-5 mx-0.5 cursor-pointer flex items-center justify-center space-x-1`} onClick={Logout}>
                        <p className='text-white my-auto'>Logout</p>
                        <RiLogoutCircleRLine className='text-red-500 text-xl' />
                    </div>
                </div>
                {props?.children}
            </div>

        </div>
    )
}