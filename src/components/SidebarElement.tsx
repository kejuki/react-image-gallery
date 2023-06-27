interface SidebarElementProps {
  title: string
}

function SidebarElement({title}: SidebarElementProps){
  return(
    <button disabled className="sidebar-element">{title}</button>
  )
}

export default SidebarElement