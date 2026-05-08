import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/loadingstyle.css';
import tick from '../assets/images/tick.png';
import homeIcon from '../assets/images/homeIcon.png';
import queueIcon from '../assets/images/Queue.svg';
import KueLogo from '../assets/images/logo.png';


function Pending(props) {
    const navigate = useNavigate();
    // Home Page redirect 
    const directToHome = () => {
        navigate('/');
    }
    //Queue page redirect
    const directToQueue = () => {
        navigate('/queue');
    }

    return (

        <div className="homeContainer">
            <section className="home">
                <div className="container">
                    <header>
                        <a onClick={directToHome}>
                            <img className="logo" src={KueLogo} height="" alt="Logo"/>
                        </a>
                        <div className="ClubLine"></div>
                    </header>

                    <div className='homePage'>
                        <h2>Request Sent!</h2>
                        <img className="tick" src={tick} alt={tick}/>

                        <main>
                            <div className="search-button">
                                <button type="submit" onClick={directToHome}>
                                    <img className="homeLogo" src={homeIcon} width="50%" height="50%" alt="Search icon" />
                                    Home
                                </button>
                                <button className="list-btn" type="submit" onClick={directToQueue}>
                                    <img src={queueIcon} width="50%" height="50%" alt="Queue icon" />
                                    View Queue
                                </button>
                            </div>
                        </main>
                    </div>

                    <footer></footer>
                </div>
            </section>
        </div>
    );

}

export default Pending;