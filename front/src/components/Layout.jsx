import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const Layout = () => (
  <div className="flex min-h-screen">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <main className="ml-64 px-4 flex-1 min-h-screen">
        <Outlet />
      </main>
    </div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
