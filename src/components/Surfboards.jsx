import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { ProgressSpinner } from 'primereact/progressspinner';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { SurfboardApi, addSurfboard, updateSurfboard, deleteSurfboard } from '../services/api';
import './SurfboardsUsers.css';
import pittedImage from '../pitted2.png';
import './NavBar.css';




export default function HomepageSurfboards() {
    const { surfboards, loading, error, fetchSurfboards } = SurfboardApi();
    const [displayDialog, setDisplayDialog] = useState(false);
    const [surfboard, setSurfboard] = useState({});
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
                <h2>Error loading surfboards</h2>
                <p>{error.message}</p>
            </div>
        );
    }

    const saveSurfboard = async () => {
        if (isNew) {
            await addSurfboard(surfboard);
        } else {
            await updateSurfboard(surfboard.id, surfboard);
        }
        setDisplayDialog(false);
        fetchSurfboards();
    };

    const deleteSurfboardHandler = async (id) => {
        await deleteSurfboard(id);
        fetchSurfboards();
    };

    const onHide = () => {
        setDisplayDialog(false);
    };

    const openAddBoard = () => {
        setSurfboard({});
        setIsNew(true);
        setDisplayDialog(true);
    };

    const editSurfboard = (surfboard) => {
        setSurfboard({ ...surfboard });
        setIsNew(false);
        setDisplayDialog(true);
    };

    const editDelete = (rowData) => {
        return (
            <div className="editdeletebuttons">
                <Button onClick={() => editSurfboard(rowData)} icon="pi pi-pencil" severity="success" />
                <Button onClick={() => deleteSurfboardHandler(rowData.id)} icon="pi pi-trash" severity="danger" />
            </div>
        );
    };

    const saveCancelButtons = () => {
        return (
            <div>
                <Button onClick={saveSurfboard} label="Save" icon="pi pi-check" />
                <Button onClick={onHide} label="Cancel" icon="pi pi-times" className="p-button-secondary" />
            </div>
        );
    };

    const brahWhySoManyCharacters = (rowData) => {
        const description = rowData.description || '';
        return description.length > 100 
            ? `${description.slice(0, 100)}...` 
            : description;
    };

    const types = [
        { Type: 'Shortboard'},
        { Type: 'Midlength'},
        { Type: 'Longboard'}
    ];
    
    return (
        <div className="App">
            <div className="navbar-header">
                <img className="navbar-image" src={pittedImage} alt="so pitted" />
                 <header className="App-header">
                    Surfboard Admin
                </header>
                <img className="navbar-image" src={pittedImage} alt="so pitted" />
            </div>
            <div className="card">
                <div className="cardbutton-container">
                    <Button onClick={openAddBoard} className="cardbutton" label="Add Surfboard" icon="pi pi-plus" />
                    <Button onClick={() => fetchSurfboards()} className="cardbutton" label="Refresh" icon="pi pi-refresh" outlined />
                </div>
                <DataTable value={surfboards} removableSort tableStyle={{ minWidth: '25rem' }}>
                    <Column field="userid" header="Userid" sortable filter style={{ width: '15%' }}></Column>
                    <Column field="type" header="Type" sortable filter style={{ width: '15%' }}></Column>
                    <Column field="brand" header="Brand" sortable filter style={{ width: '15%' }}></Column>
                    <Column field="model" header="Model" sortable filter style={{ width: '15%' }}></Column>
                    <Column field="length" header="Length" sortable filter style={{ width: '15%' }}></Column>
                    <Column field="dimensions" header="Dims" sortable filter style={{ width: '15%' }}></Column>
                    <Column field="volume" header="Volume" sortable filter style={{ width: '15%' }}></Column>
                    <Column field="fins" header="Fin System" sortable filter style={{ width: '15%' }}></Column>
                    <Column field="description" header="Description" sortable filter style={{ width: '15%' }} body={brahWhySoManyCharacters}></Column>
                    <Column field="price" header="Price" sortable filter style={{ width: '15%' }}></Column>
                    <Column field="quantity" header="Quantity" sortable filter style={{ width: '15%' }}></Column>
                    <Column body={editDelete} header="Edit/Delete" style={{ width: '10%' }}></Column>
                </DataTable>
            </div>
            <Dialog visible={displayDialog} style={{ width: '450px' }} header="Add Surfboard" modal={true} footer={saveCancelButtons()} onHide={onHide}>
                <div className="p-fluid">
                     <div className="p-field">
                        <label>Userid</label>
                        <InputText
                            id="userid"
                            value={surfboard.userid}
                            onChange={(e) => setSurfboard({ ...surfboard, userid: e.target.value })}
                            />
                    </div>
                    <div className="p-field">
                        <label>Type</label>
                        <div className="p-field">
                        <Dropdown 
                                value={surfboard.type}
                                onChange={(e) => setSurfboard({ ...surfboard, type: e.value })}
                                options={types.map(type => type.Type)}
                                optionLabel="Type"
                                placeholder="Select a Board Type"
                                className="w-full md:w-14rem" />
                        </div>
                    <div className="p-field">
                        <label>Brand</label>
                        <InputText
                            id="brand"
                            value={surfboard.brand}
                            onChange={(e) => setSurfboard({ ...surfboard, brand: e.target.value })}
                            />
                    </div>
                    <div className="p-field">
                        <label>Model</label>
                        <InputText
                            id="model"
                            value={surfboard.model}
                            onChange={(e) => setSurfboard({ ...surfboard, model: e.target.value })}
                            />
                    </div>
                    <div className="p-field">
                        <label>Length</label>
                        <InputText
                            id="length"
                            value={surfboard.length}
                            onChange={(e) => setSurfboard({ ...surfboard, length: e.target.value })}
                            />
                    </div>
                    <div className="p-field">
                        <label>Dimensions</label>
                        <InputText
                            id="dimensions"
                            value={surfboard.dimensions}
                            onChange={(e) => setSurfboard({ ...surfboard, dimensions: e.target.value })}
                            />
                    </div>
                    <div className="p-field">
                        <label>Volume</label>
                        <InputNumber
                            id="volume"
                            value={surfboard.volume}
                            onChange={(e) => setSurfboard({ ...surfboard, volume: e.value })}
                            />
                    </div>
                    <div className="p-field">
                        <label>Fin System</label>
                        <InputText
                            id="fins"
                            value={surfboard.fins}
                            onChange={(e) => setSurfboard({ ...surfboard, fins: e.target.value })}
                            />
                    </div>
                    <div className="p-field">
                        <label>Description</label>
                        <InputText
                            id="description"
                            value={surfboard.description}
                            onChange={(e) => setSurfboard({ ...surfboard, description: e.target.value })}
                            />
                    </div>
                    <div className="p-field">
                        <label>Price</label>
                        <InputNumber
                            id="price"
                            value={surfboard.price}
                            onChange={(e) => setSurfboard({ ...surfboard, price: e.value })}
                            />
                    </div>
                    <div className="p-field">
                        <label>Quantity</label>
                        <InputNumber
                            id="quantity"
                            value={surfboard.quantity}
                            onChange={(e) => setSurfboard({ ...surfboard, quantity: e.value })}
                            />
                    </div>
                </div>
                </div>
            </Dialog>
        </div>
    );
}