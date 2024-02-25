import React from "react";
import "./style/footer.css";
import gitHub from "./assets/github.svg";
import Instagram from "./assets/instagram.svg";
import Twitter from "./assets/twitter.svg";
import Linkedin from "./assets/linkedin.svg";

const Footer = () => {
  return (
    <section className="footer-section">
      <div className="footer-content">
        <div className="footer-links">
          <div className="footer-links-div">
            <h4>For Studing</h4>
            <a href="#">
              <p>React Tutorials</p>
            </a>
            <a href="#">
              <p>JavaScript Courses</p>
            </a>
            <a href="#">
              <p>UI/UX Design Study Material</p>
            </a>
          </div>
          <div className="footer-links-div">
            <h4>Resources</h4>
            <a href="#">
              <p>React Documentation</p>
            </a>
            <a href="#">
              <p>Development Tools</p>
            </a>
            <a href="#">
              <p>Useful Libraries</p>
            </a>
          </div>
          <div className="footer-links-div">
            <h4>Swing Tech</h4>
            <a href="#">
              <p>React Native Installation Guide</p>
            </a>
            <a href="#">
              <p>Node.js Documentation</p>
            </a>
            <a href="#">
              <p>Front-end Frameworks</p>
            </a>
          </div>
          <div className="footer-links-div">
            <h4>Company</h4>
            <a href="#">
              <p>About Our Company</p>
            </a>
            <a href="#">
              <p>News and Updates</p>
            </a>
            <a href="#">
              <p>Career</p>
            </a>
            <a href="#">
              <p>Contact</p>
            </a>
          </div>
          <div className="footer-links-div">
            <h4>Heitor</h4>
            <div className="socialmedia">
              <p>
                <a href="https://github.com/lonelykkj" target="_blank">
                  <img src={gitHub} alt="" />
                </a>
              </p>
              <p>
                <a
                  href="https://www.linkedin.com/in/heitor-manoel-465413250/"
                  target="_blank"
                >
                  <img src={Linkedin} alt="" />
                </a>
              </p>
              <p>
                <a href="https://www.instagram.com/h_eitoor/" target="_blank">
                  <img src={Instagram} alt="" />
                </a>
              </p>
            </div>
            <h4>Ryan</h4>
            <div className="socialmedia">
              <p>
                <a
                  href="https://github.com/RyanGustavoGoncalves"
                  target="_blank"
                >
                  <img src={gitHub} alt="" />
                </a>
              </p>
              <p>
                <a
                  href="https://www.linkedin.com/in/ryangon%C3%A7alves/"
                  target="_blank"
                >
                  <img src={Linkedin} alt="" />
                </a>
              </p>
              <p>
                <a href="https://www.instagram.com/rgg09z/" target="_blank">
                  <img src={Instagram} alt="" />
                </a>
              </p>
            </div>
            <h4>Nikolas</h4>
            <div className="socialmedia">
              <p>
                <a href="https://github.com/thepokenik" target="_blank">
                  <img src={gitHub} alt="" />
                </a>
              </p>
              <p>
                <a
                  href="https://www.linkedin.com/in/nikolas-melo-5743b1258/"
                  target="_blank"
                >
                  <img src={Linkedin} alt="" />
                </a>
              </p>
              <p>
                <a
                  href="https://www.instagram.com/incognitoniko/"
                  target="_blank"
                >
                  <img src={Instagram} alt="" />
                </a>
              </p>
            </div>
          </div>
        </div>
        <hr></hr>
        <div className="footer-bellow">
          <div className="footer-copyright">
            <p>@{new Date().getFullYear()} Elf. All right reserved</p>
          </div>
          <div className="footer-bellow-links">
            <a href="#">
              <div>
                <p>Terms & Conditions</p>
              </div>
            </a>
            <a href="#">
              <div>
                <p>Privacy</p>
              </div>
            </a>
            <a href="#">
              <div>
                <p>Security</p>
              </div>
            </a>
            <a href="#">
              <div>
                <p>Cookie Declaration</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
