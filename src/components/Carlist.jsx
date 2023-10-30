import {useState, useEffect, forwardRef} from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import ConfirmDelete from './ConfirmDelete';
import AddCar from './AddCar';
import EditCar from './EditCar';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

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
            <ConfirmDelete deleteCar={deleteCar} car={row.data}/>
        );
    };

    const deleteCar = (link) => {
        const action = 'Delete';
        fetch(link, {method: 'DELETE'})
        .then(response => fetchData())
        .catch(err => console.error(err))
        handleSnackOpen(action);
    };

    const saveCar = (car) => {
        const action = 'Save'
        fetch('http://carrestapi.herokuapp.com/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(response => fetchData())
        .catch(err => console.error(err))
        handleSnackOpen(action);
    };

    const updateCar = (car, link) => {
        const action = 'Edit'
        fetch(link, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(car)
        })
        .then(response => fetchData())
        .catch(err => console.error(err))
        handleSnackOpen(action);
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
    ];

    // Snackbar stuff
    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const [open, setOpen] = useState(false);
    const [action, setAction] = useState('');

    const handleSnackOpen = (action) => {
        setOpen(true);
        setAction(action)
      };
    
    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };

    return(
        <div className='ag-theme-material' style={{width: '1400px', height: '700px', margin: 'auto', padding: '20px 0'}}>
            <AddCar saveCar={saveCar}/>
            <AgGridReact 
                columnDefs={columns}
                rowData={cars}
                animateRows="true"
                pagination="true"
                paginationAutoPageSize="true"
            />
            <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackClose}>
                <Alert onClose={handleSnackClose} severity="info" sx={{ width: '100%' }}>
                    {action} succesful!
                </Alert>
            </Snackbar>
        </div>
    );
}