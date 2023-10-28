import {useState, useEffect, useRef} from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

export default function Carlist(){
    const [cars, setCars] = useState([]);
    const gridRef = useRef();

    useEffect(()=> fetchData(), []);

    const fetchData = () => {
        fetch('http://carrestapi.herokuapp.com/cars')
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
    };

    const columns = [
        {
            headerName: 'Brand',
            field: 'brand'
        },
        {
            headerName: 'Model',
            field: 'model'
        }
    ]

    return(
        <div className='ag-theme-material' style={{width: '45em', height: '400px', margin: 'auto', textAlign: 'center'}}>
            <AgGridReact 
                columnDefs={columns}
                rowData={cars}
            />
        </div>
    );
}