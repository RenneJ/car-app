import {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '0px',
    boxShadow: 24,
    p: 4,
};

export default function ConfirmDelete(props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const deleteCar = () => {
        var link = props.car._links.car.href;
        props.deleteCar(link);
        handleClose();
    }

    return (
        <div>
            <Button variant="contained" size="small" color="error" onClick={handleOpen}>Delete</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Confirm delete
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
                    Delete {props.car.brand} {props.car.model} &#40;{props.car.year}&#41; from the database?
                </Typography>
                    <Button size="small" onClick={handleClose}>Cancel</Button>
                    <Button size="small" variant="contained" color="error" onClick={deleteCar}>Delete</Button>
                </Box>
            </Modal>
        </div>
    );
}