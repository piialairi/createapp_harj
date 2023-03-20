import React, { useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
//import { useRef } from 'react';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
//import Box from '@mui/material/Box';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

export default function Todolist() {
    //const [description, setDescription] = useState(''); // ei tarvitse React. alkuun, koska importoitu alussa
    const [todo, setTodo] = useState({
        description: '',
        date: '',
        priority: ''
    });
    const [todos, setTodos] = useState([]);

    const gridRef = useRef();

    const [columnDefs] = useState([
        { field: 'description', sortable: true, filter: true, floatingFilter: true },
        {
            field: 'priority', sortable: true, filter: true, floatingFilter: true,
            cellStyle: params => params.value === 'High' ? { color: 'red' } : { color: 'black' }
        },
        { field: 'date', sortable: true, filter: true, floatingFilter: true }
    ])

    const handleAddTodo = () => {
        setTodos([todo, ...todos]);
        setTodo({ description: '', date: '', priority: '' });
        // setTodos([description, ...todos]); käännetty järjestys
    }

    const handleDeleteTodo = (row) => {
        setTodos(todos.filter((todo, index) => row !== index)); //poistaa uudesta taulukosta sen, mikä ei ole tosi
        //console.log("Delete todo" + row);
    }
    const deleteTodo = () => {
        if (gridRef.current.getSelectedNodes().length > 0) {
            setTodos(todos.filter((todo, index) => index !== gridRef.current.getSelectedNodes()[0].childIndex))
        }    // setTodos(todos.filter((todo, index) => gridRef.currentgetSelectedNodes()[0].id != index
        else {
            alert('Select row first');
        }
    };


    return (
        <div>
            <Stack direction='row'
                spacing={2}
                alignItems='center'
                justifyContent='center'>
                <TextField
                    variant='standard'
                    label='Description'
                    value={todo.description}
                    onChange={e => setTodo({ ...todo, description: e.target.value })}
                />
                <TextField
                    variant='standard'
                    label='Priority'
                    value={todo.priority}
                    onChange={e => setTodo({ ...todo, priority: e.target.value })}
                />
                <TextField
                    variant='standard'
                    label='Date'
                    value={todo.date}
                    onChange={e => setTodo({ ...todo, date: e.target.value })} />

                <Button
                    size='medium'
                    startIcon={<AddIcon />}
                    variant="contained"
                    onClick={handleAddTodo}>Add
                </Button>
                <Button
                    size='large'
                    startIcon={<DeleteIcon />}
                    variant='contained'
                    color='error'
                    onClick={deleteTodo}>Delete</Button>
            </Stack>
            <div className='ag-theme-material' style={{ height: 500, width: 600, margin: 'auto' }}>
                <AgGridReact
                    ref={gridRef}
                    onGridReady={params => gridRef.current = params.api}
                    rowSelection='single' // multi - käyttäjä voi valita usean rivin kerrallaan
                    rowData={todos}
                    columnDefs={columnDefs}
                    animateRows={true}

                />
            </div>

        </div >
    );
}

