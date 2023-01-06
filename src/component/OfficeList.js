import React, { useState, useEffect } from 'react';
import { Form, Table, Button } from 'react-bootstrap';
import { doc, deleteDoc } from 'firebase/firestore';

const OfficeList = (props) => {
    const [search, setSearch] = useState('');
    const [officeData, setOfficeData] = useState(props.data);

    useEffect(() => {
        setOfficeData(props.data)
    }, [props.data]);


    const searchHandler = () => {
        return officeData.filter(a =>
            a.name
                .toLocaleLowerCase()
                .includes(search.toLowerCase())
        );
    }

    const deleteOfficeHandler = async (id) => {
        const deleteConfirm = window.confirm('Are You Sure?')
        if (deleteConfirm) {
            const newdata = officeData.filter(i => i.id !== id);
            setOfficeData(newdata);
            const userDoc = doc(props.officeCollectionref, id)
            await deleteDoc(userDoc)
        }
    }

    return (
        <div>
            <div className='card shadow mb-4 border-left-primary'>
                <div className='card-header py-3 d-flex flex-row align-items-center justify-content-between'>
                    <h6 className='m-0 font-weight-bold text-primary'>Office List</h6>
                    <Form.Control
                        size="sm"
                        type="text"
                        placeholder="Search Office Location"
                        style={{ width: "auto" }}
                        onChange={(e) => {
                            setSearch(e.target.value)
                        }} />
                </div>
                <div className='card-body'>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Office Location</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchHandler().map((data, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{data.name}</td>
                                        <td>
                                            <Button variant='danger' onClick={() => deleteOfficeHandler(data.id)} className='btn-sm'>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{ marginRight: "0px" }}>
                                                    <path fill="#fff" d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z" />
                                                </svg>
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default OfficeList;