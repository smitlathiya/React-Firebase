import React, { useState } from 'react';
import { useAuth } from '../contenxt/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import userImg from '../img/undraw_profile.svg'

const Header = () => {
    const [error, setError] = useState("");
    const { currentUser, logout, profileInfo } = useAuth()
    const navigate = useNavigate();

    async function handleLogout() {
        setError('')
        try {
            await logout()
            navigate('/login')

        } catch (e) {
            setError('failed to logout')
        }
    }
    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                <i className="fa fa-bars"></i>
            </button>
            {/* <form
                className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                <div className="input-group">
                    <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..."
                        aria-label="Search" aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="button">
                            <i className="fas fa-search fa-sm"></i>
                        </button>
                    </div>
                </div>
            </form> */}
            <ul className="navbar-nav ml-auto">
                <div className="topbar-divider d-none d-sm-block"></div>
                <li className="nav-item dropdown no-arrow">
                    <a className="nav-link dropdown-toggle" id="userDropdown" role="button"
                        data-toggle="dropdown" href='/' aria-haspopup="true" aria-expanded="false">
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                            {profileInfo.name}</span>
                        <img className="img-profile rounded-circle"
                            src={currentUser.photoURL ? currentUser.photoURL : userImg} alt='profile icon' />
                    </a>
                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                        aria-labelledby="userDropdown">
                        <Link className="dropdown-item" to='profile'>
                            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                            Profile
                        </Link>
                        <div className="dropdown-divider"></div>
                        <button className="dropdown-item" onClick={handleLogout}>
                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                            Logout
                        </button>
                    </div>
                </li>
            </ul>
        </nav>

    );
}
export default Header