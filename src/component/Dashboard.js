import React, { useEffect, useState } from 'react';
import { getDocs, deleteDoc, doc, query, where, updateDoc } from 'firebase/firestore';
import { Alert, Button, ButtonGroup, Form, Modal } from 'react-bootstrap';
import { useAuth } from '../contenxt/AuthContext';
import Spinner from './Spinner';
import { dataCollectionRef, officeCollectionRef } from '../CollectionRef/CollectionRef';

const Dashboard = (props) => {
    const [data, setData] = useState([]);
    const { profileInfo } = useAuth()
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [show, setShow] = useState(false);
    const [updateData, setUpdateData] = useState([]);
    const [office, setOffice] = useState([])
    const [updateFormError, setUpdateFormError] = useState('');

    const handleClose = () => setShow(false);

    let dataQuert = null;
    if (profileInfo.office && !props.admin) {
        dataQuert = query(dataCollectionRef, where('office', '==', profileInfo.office))
    }
    if (props.admin) {
        dataQuert = dataCollectionRef
    }

    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            const data = await getDocs(dataQuert);
            setData(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
            const ofc = await getDocs(officeCollectionRef);
            setOffice(ofc.docs.map(doc => ({ ...doc.data(), id: doc.id })))
            setLoading(false)
        };
        getData();
    }, [profileInfo.office]);

    const deleteUser = async (id) => {
        const deleteConfirm = window.confirm('Are You Sure?')
        if (deleteConfirm) {
            const newdata = data.filter(i => i.id !== id);
            setData(newdata);
            const userDoc = doc(dataCollectionRef, id)
            await deleteDoc(userDoc)
        }
    }

    const searchHandler = () => {
        return data.filter(a =>
            a.name
                .toLocaleLowerCase()
                .includes(search.toLowerCase()) ||
            a.position
                .toLocaleLowerCase()
                .includes(search.toLowerCase())
        );
    }

    const editUserHandler = (id) => {
        const udata = data.filter(i => i.id == id);
        setUpdateData(udata[0])
    }

    const updateFormSubmit = async (id) => {
        if (updateData.name && updateData.office && updateData.position && updateData.age) {
            for (const key in data) {
                if (Object.hasOwnProperty.call(data, key)) {
                    const element = data[key];
                    if (element.id === id) {
                        let dataSwipe = [...data];
                        dataSwipe[key] = updateData;
                        setData(dataSwipe)
                        break;
                    }
                }
            }
            const userDoc = doc(dataCollectionRef, id)
            await updateDoc(userDoc, updateData)
            setShow(false)
        } else {
            setUpdateFormError('fill all the fields')
        }
    }

    return (
        <>
            {loading ? <Spinner /> : <div className="card shadow mb-4" style={{ margin: "1.5rem" }} >
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between ">
                    <h6 className="m-0 font-weight-bold text-primary">User Information</h6>
                    <Form.Control
                        size="sm"
                        type="search"
                        placeholder="Search Name and Position"
                        style={{ width: "20%" }}
                        onChange={(e) => {
                            setSearch(e.target.value)
                        }} />
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Position</th>
                                    {props.admin ? <th>Office</th> : null}
                                    <th>Age</th>
                                    {props.admin ? <th>Operatoins</th> : null}
                                </tr>
                            </thead>
                            <tbody>
                                {searchHandler().map(d => {
                                    return (
                                        <tr key={d.id}>
                                            <td>{d.name}</td>
                                            <td>{d.position}</td>
                                            {props.admin ? <td>{d.office}</td> : null}
                                            <td>{d.age}</td>
                                            {props.admin ? <td>
                                                <ButtonGroup>
                                                    <Button variant="danger" size="sm" onClick={() => deleteUser(d.id)}>
                                                        <i className="fas fa-fw fa-trash" ></i>
                                                    </Button>
                                                    <Button variant="success" size="sm" onClick={() => {
                                                        setShow(true)
                                                        editUserHandler(d.id)
                                                    }}>
                                                        <i className="fas fa-fw fa-edit" ></i>
                                                    </Button>
                                                </ButtonGroup>
                                            </td> : null}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {updateFormError ? <Alert variant='danger'>{updateFormError}</Alert> : null}
                    <Form onSubmit={(e) => {
                        e.preventDefault();
                        updateFormSubmit(updateData.id)
                    }}>
                        <Form.Group className="mb-3">
                            <Form.Control type="text" placeholder="Enter Name" value={updateData.name} onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })} />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Select value={updateData.office} onChange={(e) => setUpdateData({ ...updateData, office: e.target.value })}>
                                {office.map(k => {
                                    return <option key={k.id} value={k.name}>{k.name}</option>
                                })}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Control type='text' placeholder='Enter Position' value={updateData.position} onChange={(e) => setUpdateData({ ...updateData, position: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type="number" placeholder="Age" value={updateData.age} onChange={(e) => setUpdateData({ ...updateData, age: e.target.value })} />
                        </Form.Group>
                        <Button variant="primary" type="submit">Submit</Button>{' '}
                        <Button variant="dark" onClick={() => setShow(false)}>Cancel</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Dashboard;