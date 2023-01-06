import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contenxt/AuthContext';

const ForgotPassword = () => {

    const emailRef = useRef();
    const { resetPass } = useAuth();
    const forgotEmailhandler = (e) => {
        e.preventDefault();
        if (emailRef.current.value) {
            resetPass(emailRef.current.value)
        }
    }

    return (
        <div className="bg-gradient-primary singup-body" >
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-12 col-md-9">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-lg-6 d-none d-lg-block bg-password-image"></div>
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-2">Forgot Your Password?</h1>
                                                <p className="mb-4">
                                                    We get it, stuff happens. Just enter your email address below
                                                    and we'll send you a link to reset your password!
                                                </p>
                                            </div>
                                            <form className="user" onClick={forgotEmailhandler} >
                                                <div className="form-group">
                                                    <input type="email"
                                                        className="form-control form-control-user"
                                                        placeholder="Enter Email Address..."
                                                        ref={emailRef}
                                                        required />
                                                </div>
                                                <button className="btn btn-primary btn-user btn-block"> Reset Password </button>
                                            </form>
                                            <hr />
                                            <div className="link-wrapper">
                                                <Link to="/signup" className="small">Create an Account!</Link>
                                                <p className="small">Already have an account? <Link to='/login'>Login!</Link></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
