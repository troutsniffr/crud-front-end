import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProgressSpinner } from 'primereact/progressspinner';
import { SurfboardApi } from '../services/api';
import pittedImage from '../pitted2.png';
import './NavBar.css';



export default function Home() {
    const { surfboards, loading, error } = SurfboardApi();


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
                <h2>Big time error, Kooked out loading surfboards</h2>
                <p>{error.message}</p>
            </div>
        );
    }

    const brahWhySoManyCharacters = (rowData) => {
        const description = rowData.description || '';
        return description.length > 100 
            ? `${description.slice(0, 100)}...` 
            : description;
    };

    return (
        <div className="App">
            <div className="navbar-header">
                <img className="navbar-image" src={pittedImage} alt="so pitted" />
                 <header className="App-header">
                    Customer View
                </header>
                <img className="navbar-image" src={pittedImage} alt="so pitted" />
            </div>
            <div className="card">
                {surfboards && surfboards.length > 0 ? (
                    <DataTable value={surfboards} removableSort tableStyle={{ minWidth: '25rem' }}>
                        <Column field="type" header="Type" sortable style={{ width: '25%' }}></Column>
                        <Column field="brand" header="Brand" sortable style={{ width: '25%' }}></Column>
                        <Column field="model" header="Model" sortable style={{ width: '25%' }}></Column>
                        <Column field="length" header="Length" sortable style={{ width: '25%' }}></Column>
                        <Column field="dimensions" header="Dimensions" sortable style={{ width: '25%' }}></Column>
                        <Column field="volume" header="Volume" sortable style={{ width: '25%' }}></Column>
                        <Column field="fins" header="Fins" sortable style={{ width: '25%' }}></Column>
                        <Column field="description" header="Description" sortable style={{ width: '25%' }} body={brahWhySoManyCharacters}></Column>
                        <Column field="price" header="Price" sortable style={{ width: '25%' }}></Column>
                        <Column field="quantity" header="Quantity" sortable style={{ width: '25%' }}></Column>
                    </DataTable>
                ) : (
                    <p>No surfboards brah.</p>
                )}
            </div>
        </div>
    );
}