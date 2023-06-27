import './Sidebar.css'
import SidebarElement from './SidebarElement'

function Sidebar(){
  return(
    <div className="sidebar">
      <SidebarElement title={"Logo"}/>
      <SidebarElement title={"Home"}/>
      <SidebarElement title={"Search"}/>
      <SidebarElement title={"Explore"}/>
      <SidebarElement title={"Create"}/>
      <SidebarElement title={"Profile"}/>
    </div>
  )
}

export default Sidebar