import { GrOverview } from "react-icons/gr";
import {FaAngleRight} from "react-icons/fa"
import {AiOutlineTransaction} from "react-icons/ai"
import {FiSend} from "react-icons/fi"
import {FiSettings} from "react-icons/fi"
import {FiLogOut} from "react-icons/fi"

export const navigations = [
  
    {
        name: 'Transactions',
        mainIcon: <AiOutlineTransaction size={30}/>,
        arrow: <FaAngleRight size={15} color="white"/>,
        route: "/dashboard"
    },
    {
        name: 'Send',
        mainIcon: <FiSend size={30}/>,
        arrow: <FaAngleRight size={15} color="white"/>,
        route: "/dashboard/create"
    },
   
]

export const Secondnavigations = [
    {
        name: 'Settings',
        mainIcon: <FiSettings size={30}/> ,
        arrow: <FaAngleRight size={15} color="white"/>,
        route: ""
    },
    {
        name: "Logout",
        mainIcon: <FiLogOut size={30}/>,
        arrow: <FaAngleRight size={15} color="white"/>,
        route: "/"
    }
]