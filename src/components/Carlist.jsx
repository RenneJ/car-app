import {useState, useEffect, useRef} from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

export default function Carlist() {
    const [cars, setCars] = useState([]);
    const gridRef = useRef();

    useEffect(()=> fetchData(), []);

    const fetchData = () => {
        fetch('http://carrestapi.herokuapp.com/cars')
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
        .catch(err => console.error(err))
    };

    const buttonRenderer = (row) => {
        var link = row.data._links.self.href
        return(
            <button className='del-btn' onClick={() => handleDelete(link)}>Delete</button>
        )
    };

    const handleDelete = (link) => {
        fetch(link, {method: 'DELETE'})
        .then(response => fetchData())
        .catch(err => console.error(err))
    };

    const columns = [
        {
            headerName: 'Brand',
            field: 'brand',
            filter: 'true'
        },
        {
            headerName: 'Model',
            field: 'model',
            filter: 'true'
        },
        {
            headerName: 'Color',
            field: 'color',
            filter: 'true'
        },
        {
            headerName: 'Fuel',
            field: 'fuel',
            filter: 'true'
        },
        {
            headerName: 'Year',
            field: 'year',
            filter: 'true'
        },
        {
            headerName: 'Price',
            field: 'price',
            filter: 'true'
        },
        {
            width: '100px',
            cellRenderer: buttonRenderer
        }
    ]

    return(
        <div className='ag-theme-material' style={{width: '1350px', height: '600px', margin: 'auto', padding: '20px 0'}}>
            <AgGridReact 
                columnDefs={columns}
                rowData={cars}
                ref={gridRef}
                onGridReady={ params => gridRef.current = params.api }
                rowSelection='single'
                animateRows="true"
                //style={{ width: '100%', height: '600px' }}
            />
        </div>
    );
}