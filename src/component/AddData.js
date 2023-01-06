import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { addDoc, getDocs } from 'firebase/firestore';
import AssignAdmin from './AssignAdmin';
import { useAuth } from '../contenxt/AuthContext';
import Spinner from './Spinner';
import AddOffice from './AddOffice';
import OfficeList from './OfficeList';
import { officeCollectionRef, dataCollectionRef } from '../CollectionRef/CollectionRef';

const AddData = () => {
    const [officeData, setOfficeData] = useState([]);
    const [name, setName] = useState('');
    const [office, setOffice] = useState('');
    const [position, setPosition] = useState('');
    const [age, setAge] = useState('');
    const [error, setError] = useState('');
    const { isSuperAdmin } = useAuth();
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            const data = await getDocs(officeCollectionRef);
            setOfficeData(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
            setLoading(false)
        };
        getData();
    }, []);

    const createUser = async (e) => {
        e.preventDefault();
        if (name && office && position && age) {
            setLoading(true)
            await addDoc(dataCollectionRef, { name: name, office: office, position: position, age: age }).catch(e => console.log(e))
            setName('')
            setOffice('')
            setPosition('')
            setAge('')
            setError('')
            setLoading(false)
        } else {
            setError('insert field all the field')
        }
    }

    return (
        <div className='container-fluid'>
            {loading ? <Spinner loading={loading} /> : <div style={{ margin: "1.5rem" }}>
                <div className='row'>
                    <div className="col-xl-6 col-lg-5">
                        <div>
                            <div className='card shadow mb-4 border-left-primary'>
                                <div className='card-header py-3 d-flex flex-row align-items-center justify-content-between'>
                                    <h6 className='m-0 font-weight-bold text-primary'>Insert Data</h6>
                                </div>
                                <div className='card-body'>
                                    {error ? <Alert variant='danger'>
                                        {error}
                                    </Alert> : null}
                                    <Form onSubmit={createUser}>
                                        <Form.Group className="mb-3">
                                            <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group className='mb-3'>
                                            <Form.Select value={office} onChange={(e) => setOffice(e.target.value)}>
                                                <option value=''>Office select</option>
                                                {officeData.map(k => {
                                                    return <option key={k.id} value={k.name}>{k.name}</option>
                                                })}
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group className='mb-3'>
                                            <Form.Control type='text' placeholder='Enter Position' value={position} onChange={(e) => setPosition(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Control type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
                                        </Form.Group>
                                        <Button variant="primary" type="submit">Submit</Button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                        {isSuperAdmin ? <AssignAdmin /> : null}
                    </div>
                    <div className='col-xl-6 col-lg-5'>
                        <AddOffice officeCollectionref={officeCollectionRef} />
                        <OfficeList data={officeData} officeCollectionref={officeCollectionRef} />
                    </div>
                </div>
            </div>}

        </div >
    );
}

export default AddData;