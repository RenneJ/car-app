import {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditCar(props) {
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState({
        brand: '',
        model: '',
        color: '',
        fuel: '',
        year: '',
        price: ''
    });

    const handleClickOpen = () => {
        setCar({
            brand: props.car.brand,
            model: props.car.model,
            color: props.car.color,
            fuel: props.car.fuel,
            year: props.car.year,
            price: props.car.price
        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setCar({...car, [event.target.name]: event.target.value})
    }

    const updateCar = () => {
        var link = props.car._links.car.href;
        props.updateCar(car, link);
        handleClose();
    }

    return (
        <div>
            <Button size="small" variant="contained" onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Car</DialogTitle>
                <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="brand"
                    value={car.brand}
                    onChange={e => handleInputChange(e)}
                    label="Brand"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    name="model"
                    value={car.model}
                    onChange={e => handleInputChange(e)}
                    label="Model"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    name="color"
                    value={car.color}
                    onChange={e => handleInputChange(e)}
                    label="Color"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    name="fuel"
                    value={car.fuel}
                    onChange={e => handleInputChange(e)}
                    label="Fuel"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    name="year"
                    value={car.year}
                    onChange={e => handleInputChange(e)}
                    label="Year"
                    type="number"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    name="price"
                    value={car.price}
                    onChange={e => handleInputChange(e)}
                    label="Price"
                    type="number"
                    fullWidth
                    variant="standard"
                />
                </DialogContent>
                <DialogActions>
                    <Button color="error" variant="outlined" onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={updateCar}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}