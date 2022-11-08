import Sidebar from "./sidebar";

export default function DashboardLayout(props:any){
    return (
        <div className="grid grid-cols-12">
            <div className="col-span-2">
                <Sidebar />
            </div>
            
            {props?.children}

        </div>
    )
}