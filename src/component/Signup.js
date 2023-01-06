import React, { useRef, useState, useEffect } from "react";
import { useAuth } from "../contenxt/AuthContext";
import './Signup.css'
import { Link, useNavigate } from 'react-router-dom'
import { Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getDocs, collection } from 'firebase/firestore';
import { db } from "../firebase";
const Signup = () => {

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const officeRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [officeData, setOfficeData] = useState([]);

    const officeCollectionref = collection(db, 'office')

    useEffect(() => {
        const getData = async () => {
            const data = await getDocs(officeCollectionref);
            setOfficeData(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        };
        getData();
    }, []);

    async function onSubmitHandler(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
            return setError('password do not match');
        }
        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value, nameRef.current.value, officeRef.current.value)
            navigate('/dashboard')
        } catch (e) {
            setError('Something Went Worng')
        }
        setLoading(false)
    }

    return (
        <div className="bg-gradient-primary singup-body">
            <div className="container">
                <div className="card o-hidden border-0 shadow-lg">
                    <div className="card-body p-0">
                        <div className="row">
                            <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
                            <div className="col-lg-7">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                                    </div>
                                    {error && <div className="alert alert-danger" role="alert">{error}</div>}
                                    <form className="user" onSubmit={onSubmitHandler}>
                                        <div className="form-group">
                                            <input type="text"
                                                className="form-control form-control-user"
                                                placeholder="Full Name"
                                                ref={nameRef} required />
                                        </div>
                                        <div className="form-group">
                                            <input type="email"
                                                className="form-control form-control-user"
                                                placeholder="Email Address"
                                                ref={emailRef} required />
                                        </div>
                                        <div className="form-group">
                                            <Form.Select ref={officeRef}>
                                                <option value='0'>Select Office</option>
                                                {officeData.map(ofc => {
                                                    return <option key={ofc.id} value={ofc.name}>{ofc.name}</option>
                                                })}
                                            </Form.Select>
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control form-control-user"
                                                placeholder="Password"
                                                ref={passwordRef} required />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control form-control-user"
                                                placeholder="Confirm Password"
                                                ref={passwordConfirmationRef} required />
                                        </div>
                                        <button disabled={loading} className="btn btn-primary btn-user btn-block">Register Account</button>
                                    </form>
                                    <hr />
                                    <div className="text-center">
                                        <p className="small">Already have an account? <Link to='/login'>Login!</Link></p>
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

export default Signup;