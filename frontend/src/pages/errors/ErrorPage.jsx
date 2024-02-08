import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './style/style.css';
import '../welcomePage/style/style.css';
import error404page from './assets/error404page.png'
import wave from './assets/wave.svg';

const DateTimeCounter = () => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);


        return () => clearInterval(intervalId);
    }, []);

    return (
        <main className="errorPage404Main">
            <div className="WelcomeDescWaveError">
                <img src={wave} alt="" />
            </div>
            <section className="sectionError404">
                <div className="errorDiv">
                    <h1>ERROR</h1>
                    <h2>404</h2>
                    <span>Page not found</span>
                    <p>{currentDateTime.toLocaleString()}</p>
                    <img src={error404page} alt="" />
                </div>
                <div className="btnTxt">
                    <Link to={"/"}><button>Back</button></Link>
                </div>
            </section>
        </main>
    );
};

export default DateTimeCounter;
