import React from "react";
import '../../style/style.css';
import wave from './assets/wave.svg';
import AboutImg from './assets/AboutImg.png'
import iconBalanca from './assets/iconBalanca.png';

const WelcomeDescri = () => {

    return (
        <section className="WelcomeDescSection" id="hyper">
            <div className="WelcomeDescWave">
                <img src={wave} alt="" />
            </div>
            <article className="WelcomeDescArticle">
                <img src={AboutImg} alt="AboutImage" />
                <div className="TxtWelcomeDesc">
                    <h2>About</h2>
                    <span>The request ease project aims to help users help themselves with job requests, facilitating and reducing administrative stress.</span>
                </div>
            </article>
            <div className="centerBalance">
                <div className="WelcomeDescBalance">
                    <img src={iconBalanca} alt="balance" />
                    <span>
                        Experience, commitment and value. It is our mission to consistently provide this to our customers.
                    </span>
                </div>
            </div>
        </section>
    );
};

export default WelcomeDescri;