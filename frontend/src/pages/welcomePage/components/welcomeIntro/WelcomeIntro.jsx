import React from "react";
import "../../style/style.css";
import computer from "./assets/imgFront.png";
import seta from "./assets/imgSeta.png";
import { Link } from "react-router-dom";

const WelcomeIntro = () => {
  return (
    <section className="welcomeIntroSection">
      <article className="welcomeIntroArticle">
        <div className="welcomeTxt">
          <span>Rest easy knowing your calls are in good hands.</span>
          <div className="btnTxt">
            <Link to={"/auth"}>
              <button class="animated-button">
                <svg
                  viewBox="0 0 24 24"
                  class="arr-2"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                </svg>
                <span class="text">Start</span>
                <span class="circle"></span>
                <svg
                  viewBox="0 0 24 24"
                  class="arr-1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                </svg>
              </button>
            </Link>
          </div>
        </div>
        <img src={computer} alt="" />
      </article>
      <div className="animation">
        <a href="#hyper">
          <div className="setaWelcomeIntro">
            <img src={seta} alt="descer" />
          </div>
        </a>
      </div>
    </section>
  );
};
export default WelcomeIntro;
