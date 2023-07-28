import { PLP } from "../utilities/routes"
import { useNavigate } from "react-router-dom"


const Header = () => {
    const navigate = useNavigate();
  return (
    <div className="h-14 flex items-center px-8 sm:px-12 ">
        <button className="hover:text-slate-500/50 cursor-pointer flex gap-1 active:text-black" onClick={()=> navigate(PLP)}><span className="inline">{"<- Back "} </span><span className="hidden sm:block"> to Product Listing</span></button>
    </div>
  )
}

export default Header
