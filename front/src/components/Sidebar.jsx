import SidebarLogo from "./Sidebar/SidebarLogo";
import SidebarLinks from "./Sidebar/SidebarLink";
import SidebarUser from "./Sidebar/SidebarUser";

const Sidebar = () => (
  <div className="w-64 h-screen text-gray-700 fixed flex flex-col justify-between border-r border-gray-200">
    <div>
      <SidebarLogo />
      <SidebarLinks />
    </div>
    <SidebarUser />
  </div>
)

export default Sidebar;