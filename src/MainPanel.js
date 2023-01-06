import React from "react";
import Sidebar from "./component/Sidebar";
import Dashboard from "./component/Dashboard";
import './MainPanel.css'
import Header from "./component/Header";
import { useAuth } from "./contenxt/AuthContext";
import { Route, Routes, Navigate } from "react-router-dom";
import Profile from "./component/Propfile";
import AddData from "./component/AddData";
const MainPanel = () => {
    const { currentUser, isAdmin } = useAuth();
    return (
        <div className="main-wrapper">
            <Sidebar />
            <div className="right-block">
                <Header />
                <Routes>
                    <Route path="/dashboard" element={<Dashboard userData={currentUser} admin={isAdmin} />} />
                    <Route path="/profile" element={<Profile />} />
                    {isAdmin ? <Route path="/insertdata" element={<AddData />} /> : <Route path='/insertData' element={<Navigate to='/dashboard' replace />} />}
                </Routes>
            </div>
        </div>
    );
}
export default MainPanel;