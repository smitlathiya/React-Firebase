import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contenxt/AuthContext";
const Sidebar = () => {
    const [toggle, setToggle] = useState(true);
    const { isAdmin } = useAuth()
    return (
        <ul className={toggle ? "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" :
            "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"} id="accordionSidebar">
            <Link className="sidebar-brand d-flex align-items-center justify-content-center" to='/dashboard'>
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
            </Link>
            <hr className="sidebar-divider my-0" />
            <li className="nav-item">
                <NavLink to='/dashboard' className="nav-link">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span>
                </NavLink>
            </li>
            {isAdmin ? <li className="nav-item">
                <NavLink to='/insertdata' className="nav-link">
                    <i className="fas fa-fw fa-user-plus"></i>
                    <span>Manage Data</span>
                </NavLink>
            </li> : null}

            <hr className="sidebar-divider" />
            <div className="text-center d-none d-md-inline">
                <button className="rounded-circle border-0" id="sidebarToggle" onClick={() => setToggle(toggle ? false : true)}></button>
            </div>

        </ul>
    );
}

export default Sidebar;