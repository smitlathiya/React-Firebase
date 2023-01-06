import { doc, getDocs, query, where, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contenxt/AuthContext';
import { Table, Form } from 'react-bootstrap';
import { userCollectionRef } from '../CollectionRef/CollectionRef';

const AssignAdmin = () => {

    const { profileInfo } = useAuth()

    const [userList, setUserList] = useState([]);
    const [search, setSearch] = useState('');
    useEffect(() => {
        const getData = async () => {
            const data = await getDocs(query(userCollectionRef, where('uid', '!=', profileInfo.uid)))
            setUserList(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        }
        getData();
    }, []);

    const setAdminHandler = async (id, isAdmin) => {

        const confirmation = window.confirm("Are You Sure, You want to change the Permission?");

        if (confirmation) {
            for (const key in userList) {
                if (Object.hasOwnProperty.call(userList, key)) {
                    const element = userList[key];
                    if (element.id === id) {
                        let dataSwipe = [...userList];
                        dataSwipe[key].admin = !isAdmin;
                        setUserList(dataSwipe)
                        break;
                    }
                }
            }
            const chnageRole = { admin: !isAdmin }
            const userDoc = doc(userCollectionRef, id)
            await updateDoc(userDoc, chnageRole)
        }
    }

    const searchHandler = () => {
        return userList.filter(a =>
            a.email
                .toLocaleLowerCase()
                .includes(search.toLowerCase())
        );
    }
    return (
        <div>
            <div className='card shadow mb-4 border-left-primary'>
                <div className='card-header py-3 d-flex flex-row align-items-center justify-content-between'>
                    <h6 className='m-0 font-weight-bold text-primary'>User List</h6>
                    <Form.Control
                        size="sm"
                        type="text"
                        placeholder="Search Email"
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
                                <th>Name</th>
                                <th>Email</th>
                                <th>Admin</th>
                                {/* <th>Disable</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {searchHandler().map((data, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{data.name}</td>
                                        <td>{data.email}</td>
                                        <td>
                                            <Form>
                                                <Form.Check
                                                    type="switch"
                                                    id="custom-switch"
                                                    checked={data.admin}
                                                    onChange={() => setAdminHandler(data.id, data.admin)}
                                                />
                                            </Form>
                                        </td>
                                        {/* <td>
                                            <Button size="sm" variant="danger">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ marginRight: "0px" }}>
                                                    <path fill="#fff" d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM99.5 144.8C77.15 176.1 64 214.5 64 256C64 362 149.1 448 256 448C297.5 448 335.9 434.9 367.2 412.5L99.5 144.8zM448 256C448 149.1 362 64 256 64C214.5 64 176.1 77.15 144.8 99.5L412.5 367.2C434.9 335.9 448 297.5 448 256V256z" />
                                                </svg>
                                            </Button>
                                        </td> */}
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

export default AssignAdmin;