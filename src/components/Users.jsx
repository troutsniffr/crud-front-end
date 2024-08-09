import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { ProgressSpinner } from 'primereact/progressspinner';
import { InputText } from 'primereact/inputtext';
import { UsersApi, addUser, updateUser, deleteUser } from '../services/api';
import './SurfboardsUsers.css';
import pittedImage from '../pitted2.png';
import './NavBar.css';

export default function Users() {
    const { users, loading, error, fetchUsers } = UsersApi();
    const [displayDialog, setDisplayDialog] = useState(false);
    const [user, setUser] = useState({});
    const [isNew, setIsNew] = useState(false);

    if (loading) {
        return (
            <div className="App">
                <ProgressSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="App">
                <h2>Error loading users</h2>
                <p>{error.message}</p>
            </div>
        );
    }

    const saveUser = async () => {
        if (isNew) {
            await addUser(user);
        } else {
            await updateUser(user.id, user);
        }
        setDisplayDialog(false);
        fetchUsers();
    };

    const deleteUserHandler = async (id) => {
        await deleteUser(id);
        fetchUsers();
    };

    const onHide = () => {
        setDisplayDialog(false);
    };

    const opeAddUser = () => {
        setUser({});
        setIsNew(true);
        setDisplayDialog(true);
    };

    const editUser = (user) => {
        setUser({ ...user });
        setIsNew(false);
        setDisplayDialog(true);
    };

    const editDelete = (rowData) => {
        return (
            <div className="editdeletebuttons">
                <Button onClick={() => editUser(rowData)} icon="pi pi-pencil" severity="success" />
                <Button onClick={() => deleteUserHandler(rowData.id)} icon="pi pi-trash" severity="danger" />
            </div>
        );
    };

    const saveCancelButtons = () => {
        return (
            <div>
                <Button onClick={saveUser} label="Save" icon="pi pi-check" />
                <Button onClick={onHide} label="Cancel" icon="pi pi-times" className="p-button-secondary" />
            </div>
        );
    };

    return (
        <div className="App">
            <div className="navbar-header">
                <img className="navbar-image" src={pittedImage} alt="so pitted" />
                 <header className="App-header">
                    Users Admin
                </header>
                <img className="navbar-image" src={pittedImage} alt="so pitted" />
            </div>
            <div className="card">
            <div className="cardbutton-container">
                <Button onClick={opeAddUser} className="cardbutton" label="Add New User" icon="pi pi-plus" />
                <Button onClick={() => fetchUsers()} className="cardbutton" label="Refresh" icon="pi pi-refresh" outlined />
            </div>                    
                <DataTable value={users} removableSort tableStyle={{ minWidth: '25rem' }}>
                    <Column field="id" header="Id" sortable filter style={{ width: '15%' }}></Column>
                    <Column field="first_name" header="First Name" sortable filter style={{ width: '10%' }}></Column>
                    <Column field="last_name" header="Last Name" sortable filter style={{ width: '10%' }}></Column>
                    <Column field="username" header="Username" sortable filter style={{ width: '10%' }}></Column>
                    <Column body={editDelete} header="Edit/Delete" style={{ width: '10%' }}></Column>
                </DataTable>
            </div>
            <Dialog visible={displayDialog} style={{ width: '450px' }} header="User Details" modal={true} footer={saveCancelButtons()} onHide={onHide}>
                <div className="p-fluid">
                    <div className="p-field">
                        <label>First Name</label>
                        <InputText
                            id="first_name"
                            value={user.first_name}
                            onChange={(e) => setUser({ ...user, first_name: e.target.value })}
                        />
                    </div>
                    <div className="p-field">
                        <label>Last Name</label>
                        <InputText
                            id="last_name"
                            value={user.last_name}
                            onChange={(e) => setUser({ ...user, last_name: e.target.value })}
                        />
                    </div>
                    <div className="p-field">
                        <label>Username</label>
                        <InputText
                            id="username"
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                        />
                    </div>
                    <div className="p-field">
                        <label>Password</label>
                        <InputText
                            id="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                        />
                    </div>
                </div>
            </Dialog>
        </div>
    );
}

