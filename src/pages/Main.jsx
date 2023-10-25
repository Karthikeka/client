
import { useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/Sidebar";
const Main= () =>{
    const [openDrawer, SetopenDrawer]= useState(true);

    const toggleDrawer = () => {
        SetopenDrawer(prevstate => !prevstate);
    }



    return(
        <div>
        <Header  toggleDrawer={toggleDrawer}/>
        <SideBar openDrawer ={openDrawer}/>
        <div>
            Display mails
        </div>
        </div>
    )
}

export default Main;