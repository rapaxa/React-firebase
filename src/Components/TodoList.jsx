import {collection, doc, deleteDoc, updateDoc, addDoc, getDocs} from "firebase/firestore";
import {useState, useEffect} from "react";
import {db} from "../firebase";
import './TodoList.css';

const TodoList = () => {
    const [todoItems, setTodoItems] = useState([]);
    const [item, setItem] = useState("");

    useEffect(() => {
        const todosRef = collection(db, "todos");
        getDocs(todosRef).then((querySnapshot) => {
            const todos = [];
            querySnapshot.forEach((doc) => {
                todos.push({id: doc.id, ...doc.data()});
            });
            setTodoItems(todos);
        });
    }, []);

    const getItem = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setItem(value);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleAdd();
        }
    };


    const handleComplete = (id, complete) => {
        const todoDocRef = doc(db, "todos", id);
        updateDoc(todoDocRef, {complete: complete}).then(() => {
            const newTodoItems = todoItems.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        complete: complete
                    };
                }
                return item;
            });
            setTodoItems(newTodoItems);
        });
    };


    const handleAdd = () => {
        const newItem = {
            text: item,
            complete: false,
        };
        const todosRef = collection(db, "todos");
        addDoc(todosRef, newItem).then((docRef) => {
            setTodoItems([...todoItems, {id: docRef.id, ...newItem}]);
            setItem("");
        });
    };

    const handleDelete = (id) => {
        const todosRef = collection(db, "todos");
        const todoDocRef = doc(todosRef, id);
        deleteDoc(todoDocRef).then(() => {
            const newTodoItems = todoItems.filter((item) => item.id !== id);
            setTodoItems(newTodoItems);
        });
    };

    return (
        <div className="todo-container">
            <div className="todo-header">
                <h3>Список задач</h3>
                <input
                    className="todo-input"
                    type="text"
                    onChange={getItem}
                    value={item}
                    onKeyDown={handleKeyDown}
                />
                <button className="todo-button" onClick={handleAdd}>
                    Ввести
                </button>
            </div>
            <div className="todo-list">
                <ul>
                    {todoItems.map((item) => (
                        <li key={item.id} className={item.complete ? "complete" : ""}>
                            <input
                                className="todo-checkbox"
                                type="checkbox"
                                checked={item.complete}
                                onChange={() => handleComplete(item.id, !item.complete)}
                            />
                            <span className="todo-text">{item.text}</span>
                            <button className="todo-delete" onClick={() => handleDelete(item.id)}>
                                X
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    );
};

export default TodoList;
