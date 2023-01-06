import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../contenxt/AuthContext';
import Spinner from './Spinner';

const Propfile = () => {
    const [photoURL, setPhotoURL] = useState("../img/undraw_profile.svg");
    const [loading, setLoading] = useState(false);
    const { upload, currentUser, removeProfile, profileInfo } = useAuth();


    const onChnageHandler = (e) => {
        upload(e.target.files[0], currentUser, setLoading);
    }
    const profileRemoveHandler = () => {
        removeProfile();
        setPhotoURL("../img/undraw_profile.svg")
    }

    useEffect(() => {
        if (currentUser.photoURL) {
            setPhotoURL(currentUser.photoURL)
        }

    }, []);

    return (
        <div className='container-fluid'>
            {loading ? <Spinner loading={loading} /> : null}
            <div className='row'>
                <div className='col-xl-4 col-lg-5'>
                    <div className='card shadow mb-4 border-left-info'>
                        <div className='card-header py-3 d-flex flex-row align-items-center justify-content-between'>
                            <h6 className='m-0 font-weight-bold text-primary'>Profile Detail</h6>
                        </div>
                        <div className='card-body'>
                            <div className='text-center'>
                                <div className='user-image'>
                                    <img src={photoURL} alt={currentUser.displayName} />
                                </div>
                            </div>
                            <div>
                                <p>Name: {profileInfo.name}</p>
                                <p>email: {profileInfo.email}</p>
                            </div>
                            <div className="file-input">
                                <input type="file" id="file-input" className="file-input__input" onChange={onChnageHandler} disabled={loading} accept="image/jpeg,image/jpg" />
                                <label className="file-input__label" htmlFor="file-input">
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="upload" className="svg-inline--fa fa-upload fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path fill="currentColor" d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path>
                                    </svg>
                                    <span>Upload Profile Picture</span>
                                </label>
                            </div>
                            <Button variant='danger' size="sm" onClick={profileRemoveHandler}>Remove Profile Picture</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Propfile;