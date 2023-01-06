import React from 'react';
import { useState } from 'react';
import { addDoc, getDoc, doc } from 'firebase/firestore';
import { Form, Button, Alert } from 'react-bootstrap';
import Spinner from './Spinner';
import { db } from '../firebase';

const AddOffice = (props) => {
    const [addOffice, setAddOffice] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const createOffice = async (e) => {
        e.preventDefault();
        if (addOffice) {
            setLoading(true)
            await addDoc(props.officeCollectionref, { name: addOffice })
            setAddOffice('')
            setLoading(false)
            setError('')
            checker(addOffice);
        } else {
            setError('insert Data')
        }
    }

    const checker = async (data) => {
        const docRef = doc(db, "office", data);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
        } else {
            console.log("No such document!");
        }
    }

    return (
        <div>
            {loading ? <Spinner loading={loading} /> : null}
            <div className='card shadow mb-4 border-left-primary'>
                <div className='card-header py-3 d-flex flex-row align-items-center justify-content-between'>
                    <h6 className='m-0 font-weight-bold text-primary'>Add Office</h6>
                </div>
                <div className='card-body'>
                    {error ? <Alert variant='danger'>
                        {error}
                    </Alert> : null}
                    <Form onSubmit={createOffice}>
                        <Form.Group className="mb-3">
                            <Form.Control type="text" placeholder="Enter Office Location" value={addOffice} onChange={(e) => setAddOffice(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" type="submit">Add</Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default AddOffice;