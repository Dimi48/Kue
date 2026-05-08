import '../assets/css/search.css';
import React, {useState, useEffect} from "react";
import fetch from 'isomorphic-fetch';
import axios from "axios";
import deleteIcon from '../assets/images/delete-icon.png';
import searchIcon from '../assets/images/search-icon.png';
import kue2 from '../assets/images/logo2.png';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const InputText = () => {
    const [todos, setTodos] = useState([]); // Fixed: added 'todos' here
    const [tracks, setTracks] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();

    const spotifyAccess = (function() {
        const clientID = 'accae6b6c5604b8b9793c93ce82dcb73';
        const clientSecret = 'c131cb4ca8954077bfd42c7b87b0b8d4';

        const getToken = async () => {
            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/x-www-form-urlencoded',
                    'Authorization' : 'Basic ' + btoa(clientID + ':' + clientSecret)
                },
                body: 'grant_type=client_credentials'
            });
            const data = await response.json();
            return data.access_token;
        }
        
        const search = async (query) => {
            if(!query) return [];
            const token = await getToken();
            const result = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await result.json();
            return data.tracks.items;
        }
        return { search }
    })();

    const spotifySearch = (e) => {
        if(e.preventDefault) e.preventDefault();
        const query = e.target.value || inputValue;
        if(query) {
            spotifyAccess.search(query).then(setTracks);
        }
    }

    const msToMinutesAndSeconds = (ms) => {
        let minutes = Math.floor(ms / 60000);
        let seconds = ((ms % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    const getTodos = () =>
        axios(`${BACKEND_URL}/todos`)
            .then((resp) => setTodos(resp.data));

    useEffect(() => {
        getTodos();
    }, []);

    const InputChange = (e) => {
        setInputValue(e.target.value);
    }

    const ClearInput = () => {
        setInputValue('');
        setTracks([]);
    }

    const Input = (e) => {
        InputChange(e);
        spotifySearch(e);
    }

    const TrackSelect = (artist, name, coverArtURL) => {
        navigate(`/confirm?artist=${encodeURIComponent(artist)}&track=${encodeURIComponent(name)}&coverArtURL=${encodeURIComponent(coverArtURL)}`);
    }

    const returnHome = () => {
        navigate("/");
    }

    const enterKey = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    }

    return (
        <div className='searchContainer'>
            <section className="search">
                <div className="container">
                    <header>
                        <a onClick={returnHome} href="/">
                            <img src={kue2} alt="logo" />
                        </a>
                    </header>
                    <form id="searchForm" autoComplete="off" onSubmit={spotifySearch}>
                        <button id="btnSearch" type="submit">
                            <img src={searchIcon}  alt="search icon" />
                        </button>
                        <input
                            onKeyDown={enterKey}
                            type="text"
                            name="searchInput"
                            id="input"
                            onChange={Input}
                            value={inputValue}
                            placeholder="What song would you like to request?"
                        />
                        {inputValue ? (
                            <button className='btnDelete' type="button" onClick={ClearInput}><img src={deleteIcon} alt="Delete icon" className="btnDelete"/></button>
                        ) : null}
                    </form>
                    <div className="songDisplay">
                        {tracks.map((track) => (
                            <div className="tracks" key={track.id}>
                                <div onClick={() => TrackSelect(track.artists[0].name, track.name, track.album.images[2].url)}>
                                    <div className="track-row">
                                        <img src={track.album.images[2].url} alt="cover art"/>
                                        <div className="track-info">
                                            <ul className="info">
                                                <li className="title" id="trackName">{track.name}</li>
                                                <li className="artist">{track.artists[0].name}</li>
                                            </ul>
                                        </div>
                                        <div className="track-time">
                                            <p className="time">{msToMinutesAndSeconds(track.duration_ms)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
export default InputText;