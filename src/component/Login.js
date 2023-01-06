import React, { useState, useRef } from "react";
import { useAuth } from "../contenxt/AuthContext";
import { Link, Outlet, useNavigate } from "react-router-dom";
import './Signup.css'
const Login = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function onSubmitHandler(e) {
        e.preventDefault();
        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate('/dashboard')
        } catch {
            setError('Failed to login')
        }
        setLoading(false)
    }


    return (
        <div className="bg-gradient-primary singup-body" >
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-12 col-md-9">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                            </div>
                                            {error && <div className="alert alert-danger" role="alert">{error}</div>}
                                            <form className="user" onSubmit={onSubmitHandler}>
                                                <div className="form-group">
                                                    <input type="email" className="form-control form-control-user"
                                                        placeholder="Enter Email Address..." name='email' ref={emailRef} required />
                                                </div>
                                                <div className="form-group">
                                                    <input type="password" className="form-control form-control-user"
                                                        placeholder="Password" name='password' ref={passwordRef} required />
                                                </div>
                                                <button className="btn btn-primary btn-user btn-block" disabled={loading}>Login</button>
                                            </form>
                                            <hr />
                                            <div className="link-wrapper">
                                                <Link to="/signup" className="small">Create an Account!</Link>
                                                <Link to="/forgotpassword" className="small">Forgot Password</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Outlet />
            </div>
        </div>
    );
}

export default Login;