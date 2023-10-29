import {useState, useEffect} from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import ConfirmDelete from './ConfirmDelete';
import AddCar from './AddCar';
import EditCar from './EditCar';

export default function Carlist() {
    const [cars, setCars] = useState([]);

    useEffect(()=> fetchData(), []);

    const fetchData = () => {
        fetch('http://carrestapi.herokuapp.com/cars')
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
        .catch(err => console.error(err))
    };

    const editButton = (row) => {
        return(
                <EditCar updateCar={updateCar} car={row.data}/>
        );
    };

    const deleteButton = (row) => {
        var link = row.data._links.self.href
        return(
                <Button variant="contained" size="small" color="error" onClick={() => handleDelete(link)}>Delete</Button>
        );
    };

    const handleDelete = (link) => {
        if(window.confirm('Are you sure?')){
            fetch(link, {method: 'DELETE'})
            .then(response => fetchData())
            .catch(err => console.error(err))
        }
    };

    const saveCar = (car) => {
        fetch('http://carrestapi.herokuapp.com/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(response => fetchData())
        .catch(err => console.error(err))
    };

    const updateCar = (car, link) => {
        fetch(link, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(car)
    })
    .then(response => fetchData())
    .catch(err => console.error(err))
    }

    const columns = [
        {
            headerName: 'Brand',
            field: 'brand',
            sortable: true,
            filter: 'agTextColumnFilter',
            suppressMenu: true,
            floatingFilter: true
        },
        {
            headerName: 'Model',
            field: 'model',
            sortable: true,
            filter: 'agTextColumnFilter',
            suppressMenu: true,
            floatingFilter: true
        },
        {
            headerName: 'Color',
            field: 'color',
            sortable: true,
            filter: 'agTextColumnFilter',
            suppressMenu: true,
            floatingFilter: true
        },
        {
            headerName: 'Fuel',
            field: 'fuel',
            sortable: true,
            filter: 'agTextColumnFilter',
            suppressMenu: true,
            floatingFilter: true
        },
        {
            headerName: 'Year',
            field: 'year',
            sortable: true,
            filter: 'agNumberColumnFilter',
            suppressMenu: true,
            floatingFilter: true
        },
        {
            headerName: 'Price',
            field: 'price',
            sortable: true,
            filter: 'agNumberColumnFilter',
            suppressMenu: true,
            floatingFilter: true
        },
        {
            width: 90,
            cellRenderer: editButton
        },
        {
            width: 100,
            cellRenderer: deleteButton
        }
    ]

    return(
        <div className='ag-theme-material' style={{width: '1420px', height: '600px', margin: 'auto', padding: '20px 0'}}>
            <AddCar saveCar={saveCar}/>
            <AgGridReact 
                columnDefs={columns}
                rowData={cars}
                animateRows="true"
            />
            <ConfirmDelete />
        </div>
    );
}