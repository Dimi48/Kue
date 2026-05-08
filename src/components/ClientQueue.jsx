import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import kuelogo from '../assets/images/logo.png'
import '../assets/css/clientlist.css';
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const ClientQueue = () => {
    const [todos, setTodos] = useState([]);
    const navigate = useNavigate();

    const getTodos = () =>
        axios(`${BACKEND_URL}/todos`)
            .then((resp) => setTodos(resp.data));

    useEffect(() => {
        const interval = setInterval(() => {
            getTodos();
        }, 1000); 
        return () => clearInterval(interval);
    }, []);

    const returnHome = () => {
        navigate("/");
    }

    return (
        <div className='paymentContainer'>
            <section className="payment">
                <div className="container">
                    <header>
                        <a onClick={returnHome} href="/">
                            <img src={kuelogo} alt="logo" />
                        </a>
                    </header>
                    <div className='confirmation'>
                        <p className="queueTitle">Queue List</p>
                        <div className="songDisplay">
                            {todos
                                .filter(todo => todo.status === "Approved")
                                .map((todo) =>
                                <div className='trackss' key={todo.id}>
                                    <div>
                                        <div className="trackRow">
                                            <img className="albumCover" src={todo.todo.coverArtURL} alt="cover art" style={{width: "45px", height: "45px"}} />
                                            <div className="trackInfo">
                                                <ul className="info">
                                                    <li className="title" id="trackName">{todo.todo.track}</li>
                                                    <li className="artist">{todo.todo.artist}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
export default ClientQueue;