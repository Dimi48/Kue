import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../assets/css/payment.css';
import { useLocation, useNavigate } from 'react-router-dom';
import abn from '../assets/images/abn_amro.png';
import ing from '../assets/images/ing.png';
import rabo from '../assets/images/rabobank.png';
import revolut from '../assets/images/revolut.svg';
import kuelogo from '../assets/images/logo.png';
import arrow1 from '../assets/images/arrow.png';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Confirm() {
    const [todos, setTodos] = useState([]);  
    const [newTodo, setNewTodo] = useState({ artist: '', track: '', coverArtURL: '' }); 
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectListVisible, setSelectListVisible] = useState(false);
    const [submitVisible, setSubmitVisible] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    
    const artist = decodeURIComponent(location.search.split('artist=')[1]?.split('&')[0] || '');
    const track = decodeURIComponent(location.search.split('track=')[1]?.split('&')[0] || '');
    const coverArtURL = decodeURIComponent(location.search.split('coverArtURL=')[1]?.split('&')[0] || '');

    const timestamp = new Date().toISOString();
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();

    useEffect(() => {
        document.getElementById("searchedTrackImg").src = coverArtURL;
        setNewTodo({ artist: artist, track: track, coverArtURL: coverArtURL });
    }, [artist, track, coverArtURL]);

    const getTodos = () =>
        axios(`${BACKEND_URL}/todos`)
            .then((resp) => setTodos(resp.data));

    useEffect(() => {
        getTodos();
    }, []);

    const handleNewTodo = (event) => {
        event.preventDefault();
        if (!newTodo.artist || !newTodo.track || !newTodo.coverArtURL) {
            return;
        }
        const data = {
            id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
            todo: newTodo,
            completed: false,
            status: 'requested',
            timestamp: formattedDate
        };
        axios
            .post(`${BACKEND_URL}/todos`, data)
            .then((resp) => {
                setTodos([...todos, resp.data]); 
                navigate('/pending');
            });
        setNewTodo({ artist: '', track: '', coverArtURL: '' }); 
    };

    const options = [
        { value: 'bank', label: 'ABN Amro', img: abn },
        { value: 'bank', label: 'ING', img: ing },
        { value: 'bank', label: 'Rabobank', img: rabo },
        { value: 'bank', label: 'Revolut', img: revolut },
    ];

    const toggleSelectList = () => {
        setSelectListVisible(!selectListVisible);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setSelectListVisible(false);
        setSubmitVisible(true);
    };

    const TrackConfirm = ({ artist, track }) => {
        return (
            <ul className="info">
                <li className="name">{track}</li>
                <li className="artist">{artist}</li>
            </ul>
        );
    };

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
                    <div className="confirmation">
                        <p className="confirm">Confirm Request</p>
                        <div className="track-row">
                            <img id="searchedTrackImg" alt="Cover Art" />
                            <div className="track-info">
                                <TrackConfirm track={track} artist={artist}/>
                            </div>
                        </div>
                        <h2 className='confirm__price'>€ 10,00</h2>
                        <form onSubmit={handleNewTodo}>
                            <div className="dropdown">
                                <div className="dropdownField" onClick={toggleSelectList}>
                                    <div className='dropField'>
                                        {selectedOption && (
                                            <img src={selectedOption.img} alt={selectedOption.label} className="selected_icon" />)}
                                        <p id="selectText" className={`${selectedOption ? 'selected' : ''} choose-bank-text`}>
                                            {selectedOption ? selectedOption.label : 'Choose your bank'}
                                        </p>
                                        <img src={arrow1} id="arrow" className={`${selectListVisible ? '' : 'rotate'}`} alt="arrow"/>
                                    </div>
                                </div>
                                <ul
                                    id="select"
                                    className={`${selectListVisible ? '' : 'hide'}`}
                                >
                                    {options.map((option) => (
                                        <li
                                            key={option.label}
                                            className="options"
                                            value={option.value}
                                            onClick={() => handleOptionClick(option)}
                                        >
                                            <img src={option.img} alt={option.label} />
                                            <p>{option.label}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <input
                                type="submit"
                                value="Confirm and Pay"
                                id="submit"
                                style={{ display: submitVisible ? 'block' : 'none' }}
                            />
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default Confirm;