import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Home.css';
import requestIcon from '../assets/images/reqSong01.svg';
import queueIcon from '../assets/images/Queue.svg';
import KueLogo from '../assets/images/logo.png';
import XLogo from '../assets/images/X.svg';
import ClubLogo from '../assets/images/Club.svg';

const welcomeLines = [
    "Hello, good-looking!",
    "You look fire tonight!",
    "Dang, who is that hottie?",
    "Wow, how do you look this good?",
    "Don't look at me, I'm blushing.",
    "If you were a vegetable, you’d be a ‘cute-cumber."
];

function Home(props) {
    const navigate = useNavigate();
    
    const directToHome = () => { navigate('/'); }
    const directToSearch = () => { navigate('/input-text'); }
    const directToQueue = () => { navigate('/queue'); }
    // The new redirect for the DJ button
    const directToList = () => { navigate('/list'); }

    const randomText = welcomeLines[Math.floor(Math.random() * welcomeLines.length)];

    return (
        <div className="homeContainer">
            <section className="home">
                <div className="container">
                    <header>
                        <a onClick={directToHome} style={{cursor: "pointer"}}>
                            <img className="logo" src={KueLogo} height="" alt="Logo"/>
                        </a>
                        <div className="ClubLine">
                            <img className="X" src={XLogo}  alt="X"/>
                            <img className="Club" src={ClubLogo} alt="Club"/>
                        </div>
                    </header>

                    <div className='homePage'>
                        <h1>{randomText}</h1>
                        <h3>Tell DJ Antonio what you want him to put in queue for 10 euros!</h3>

                        <main>
                            <div className="search-button">
                                <button type="submit" onClick={directToSearch}>
                                    <img src={requestIcon} className="requestImg" alt="Search icon" />
                                    Request
                                </button>
                                <button className="list-btn" type="submit" onClick={directToQueue}>
                                    <img src={queueIcon} alt="Queue icon" />
                                    Queue
                                </button>
                            </div>
                        </main>
                    </div>

                    <footer>
                        {/* The new sneaky DJ button */}
                        <button className="dj-login-btn" onClick={directToList}>DJ Panel</button>
                    </footer>
                </div>
            </section>
        </div>
    );
}
export default Home;