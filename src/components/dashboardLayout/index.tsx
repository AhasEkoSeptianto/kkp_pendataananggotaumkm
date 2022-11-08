import Sidebar, { SidebarMobile } from "./sidebar";
import { AiOutlineMenu } from 'react-icons/ai'
import Hamburger from 'hamburger-react'
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { BiLogOut, BiLogOutCircle } from 'react-icons/bi'

export default function DashboardLayout(props:any){

    const [isOpenMobileMenu, setOpenMobileMenu] = useState(false)

    useEffect(() => {
        let token = Cookies.get('token')
        if (!token){
            window.location.href = '/'
        }
    },[])

    const Logout = () => {
        Cookies.remove('token')
        window.location.href = '/'
    }
    
    return (
        <div className="grid grid-cols-12 overflow-hidden">
            <div className="hidden lg:block col-span-2">
                <Sidebar Logout={Logout} />
            </div>

            {isOpenMobileMenu && (
                <div className='absolute top-0 left-0 p-5 z-30 lg:hidden'>
                    <BiLogOutCircle className="text-red-600" onClick={Logout} size={40} />
                </div>
            )}

            <div className="absolute top-0 right-0 p-3 z-30 lg:hidden">
                <Hamburger toggled={isOpenMobileMenu} toggle={setOpenMobileMenu} />
            </div>
            
            {isOpenMobileMenu && (
                <SidebarMobile />
            )}
            
            <div className="col-span-12 lg:col-span-10">
                {props?.children}
            </div>

        </div>
    )
}