import React, { useState, useEffect } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField
} from '@mui/material';
import Entity from './entity';
import './styles/cabinet.css'

const Cabinet = () => {
    const [entities, setEntities] = useState([]);
    const [selectedEntity, setSelectedEntity] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

    useEffect(() => {
        const entitiesLoad = JSON.parse(localStorage.getItem('entityContainer')) || [];
        const deser = entitiesLoad.map((entityData) => {
            return new Entity(
                entityData.ccName,
                entityData.quantity,
                entityData.whenWillBeDelivered,
                entityData.ccImgUrl
            );
        });

        setEntities(deser);
    }, []);

    const delclickhandler = (entity) => {
        setSelectedEntity(entity);
        setOpenDeleteDialog(true);
    };

    const updateclickhandler = (entity) => {
        setSelectedEntity(entity);

        setNewOrder({
            ccName: entity.ccName,
            quantity: entity.quantity,
            whenWillBeDelivered: entity.whenWillBeDelivered,
        });

        setOpenUpdateDialog(true);
    };

    const confirmDel = () => {
        if (selectedEntity) {
            const updEntities = entities.filter((entity) => entity !== selectedEntity);
            setEntities(updEntities);
            localStorage.setItem('entityContainer', JSON.stringify(updEntities));
        }

        setOpenDeleteDialog(false);
    };

    const [openCreateOrderDialog, setOpenCreateOrderDialog] = useState(false);
    const [newOrder, setNewOrder] = useState({ ccName: '', quantity: '', whenWillBeDelivered: '' });

    const createOrdHandler = () => {
        setOpenCreateOrderDialog(true);
    };

    const inpChangeHandler = (e) => {
        const { name, value } = e.target;
        setNewOrder({ ...newOrder, [name]: value });
    };

    const handleCreateOrderSubmit = () => {
        if (newOrder.ccName && newOrder.quantity && newOrder.whenWillBeDelivered) {
            const updEntities = [...entities, new Entity(newOrder.ccName, newOrder.quantity, newOrder.whenWillBeDelivered, '')];
            setEntities(updEntities);
            localStorage.setItem('entityContainer', JSON.stringify(updEntities));

            setNewOrder({ ccName: '', quantity: '', whenWillBeDelivered: '' });
            setOpenCreateOrderDialog(false);
        }
    };

    const handleUpdateOrderSubmit = () => {
        if (newOrder.ccName && newOrder.quantity && newOrder.whenWillBeDelivered) {
            const updEntities = entities.map((entity) =>
                entity === selectedEntity
                    ? new Entity(newOrder.ccName, newOrder.quantity, newOrder.whenWillBeDelivered, '')
                    : entity
            );

            setEntities(updEntities);
            localStorage.setItem('entityContainer', JSON.stringify(updEntities));

            setNewOrder({ ccName: '', quantity: '', whenWillBeDelivered: '' });
            setOpenUpdateDialog(false);
        }
    };

    const [openInfoDialog, setOpenInfoDialog] = useState(false);

    const infoClickHandler = (entity) => {
        setSelectedEntity(entity);
        setOpenInfoDialog(true);
    };

    const closeDialHandle = () => {
        setOpenDeleteDialog(false);
        setOpenUpdateDialog(false);
    };

    return (
        <div className="cabinet">
            <div className="wave-header">
                <h2 style={{color: "white"}}>Your Cabinet (KSE Project V2 edition)</h2>
            </div>
            <Button variant="outlined" onClick={createOrdHandler} style={{color: 'white', borderColor: 'white'}}>Create Order</Button>

            <TableContainer component={Paper}>
                <Table sx={{color: 'white'}}>
                    <TableHead>
                        <TableRow style={{backgroundColor: '#222222'}}>
                            <TableCell sx={{color: 'white'}}>Currency Name</TableCell>
                            <TableCell sx={{color: 'white'}}>Quantity</TableCell>
                            <TableCell sx={{color: 'white'}}>Delivery Time</TableCell>
                            <TableCell sx={{color: 'white'}}>Actions</TableCell>
                            <TableCell sx={{color: 'white'}}>Info</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {entities.map((entity, index) => (
                            <TableRow key={index} style={{backgroundColor: '#222222'}}>
                                <TableCell sx={{color: 'white'}}>{entity.ccName}</TableCell>
                                <TableCell sx={{color: 'white'}}>{entity.quantity}</TableCell>
                                <TableCell sx={{color: 'white'}}>{entity.whenWillBeDelivered}</TableCell>
                                <TableCell>
                                    <Button onClick={() => delclickhandler(entity)}>Delete</Button>
                                    <Button onClick={() => updateclickhandler(entity)}>Update</Button>
                                </TableCell>
                                <TableCell sx={{color: 'white'}}>
                                    <Button onClick={() => infoClickHandler(entity)}>Info</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openDeleteDialog} onClose={closeDialHandle}>
                <DialogTitle>Delete Entity</DialogTitle>
                <DialogContent>
                    <p>Delete entity?</p>
                </DialogContent>
                <DialogActions>
                    <Button sx={{color: 'black'}} onClick={confirmDel}>Delete</Button>
                    <Button sx={{color: 'black'}} onClick={closeDialHandle}>Cancel</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openCreateOrderDialog} onClose={() => setOpenCreateOrderDialog(false)}>
                <DialogTitle>Create Order</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Currency Name"
                        name="ccName"
                        value={newOrder.ccName}
                        onChange={inpChangeHandler}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Quantity"
                        name="quantity"
                        value={newOrder.quantity}
                        onChange={inpChangeHandler}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Delivery Time"
                        name="whenWillBeDelivered"
                        value={newOrder.whenWillBeDelivered}
                        onChange={inpChangeHandler}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button sx={{color: 'black'}} onClick={handleCreateOrderSubmit}>Submit</Button>
                    <Button sx={{color: 'black'}} onClick={() => setOpenCreateOrderDialog(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openUpdateDialog} onClose={closeDialHandle}>
                <DialogTitle>Update Entity</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Currency Name"
                        name="ccName"
                        value={newOrder.ccName}
                        onChange={inpChangeHandler}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Quantity"
                        name="quantity"
                        value={newOrder.quantity}
                        onChange={inpChangeHandler}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Delivery Time"
                        name="whenWillBeDelivered"
                        value={newOrder.whenWillBeDelivered}
                        onChange={inpChangeHandler}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button sx={{color: 'black'}} onClick={handleUpdateOrderSubmit}>Update</Button>
                    <Button sx={{color: 'black'}} onClick={closeDialHandle}>Cancel</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openInfoDialog} onClose={() => setOpenInfoDialog(false)}>
                <DialogTitle>Entity Information</DialogTitle>
                <DialogContent>
                    <p><strong>Currency Name:</strong> {selectedEntity?.ccName}</p>
                    <p><strong>Quantity:</strong> {selectedEntity?.quantity}</p>
                    <p><strong>Delivery Time:</strong> {selectedEntity?.whenWillBeDelivered}</p>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ color: 'black' }} onClick={() => setOpenInfoDialog(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Cabinet;
