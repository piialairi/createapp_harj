import React, { useState } from 'react';

export default function Todolist() {
    //const [description, setDescription] = useState(''); // ei tarvitse React. alkuun, koska importoitu alussa
    const [todo, setTodo] = useState({
        description: '',
        date: ''
    });
    const [todos, setTodos] = useState([]);

    const handleAddTodo = () => {
        setTodos([todo, ...todos]);
        setTodo({ description: '', date: '' });

        //setDescription(''); // tyhjentää input kentän
        // setTodos([description, ...todos]); käännetty järjestys
    }

    const handleDeleteTodo = (row) => {
        setTodos(todos.filter((todo, index) => row !== index)); //poistaa uudesta taulukosta sen, mikä ei ole tosi
        //console.log("Delete todo" + row);
    }


    return (
        <div>
            <h1>My Todos</h1>
            <input
                placeholder='Description'
                value={todo.description}
                onChange={e => setTodo({ ...todo, description: e.target.value })}
            />
            <input type="date"
                placeholder='Date'
                value={todo.date}
                onChange={e => setTodo({ ...todo, date: e.target.value })} />
            <button onClick={handleAddTodo}>Add Todo</button>
            <table>
                <tbody>
                    <tr><th>Description</th><th>Date</th></tr>
                    {
                        todos.map((todo, index) =>
                            <tr key={index}>
                                <td>{todo.description}</td>
                                <td>{todo.date}</td>
                                <td><button onClick={() => handleDeleteTodo(index)}>Done</button></td>

                            </tr>)
                    }
                </tbody>
            </table>
        </div >
    );
}

