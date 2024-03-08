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
            <a href="https://www.w3schools.com/" target="_blank">
              <p>W3Schools</p>
            </a>
            <a href="https://www.codewars.com/" target="_blank">
              <p>CodeWars</p>
            </a>
            <a href="https://judge.beecrowd.com/pt/login?redirect=%2Fpt" target="_blank">
              <p>Beecrowd</p>
            </a>
          </div>
          <div className="footer-links-div">
            <h4>Resources</h4>
            <a href="https://legacy.reactjs.org/docs/getting-started.html" target="_blank">
              <p>React Documentation</p>
            </a>
            <a href="https://www.mongodb.com/pt-br/cloud/atlas/lp/try4?utm_source=google&utm_campaign=search_gs_pl_evergreen_atlas_core_prosp-brand_gic-null_amers-br_ps-all_desktop_pt-br_lead&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=p&utm_ad_campaign_id=20378068769&adgroup=154980291521&cq_cmp=20378068769&gad_source=1&gclid=EAIaIQobChMI7aah_bfjhAMV2Z1QBh2I4wfoEAAYASAAEgLaWPD_BwE" target="_blank">
              <p>MongoDB</p>
            </a>
            <a href="https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/" target="_blank">
              <p>Spring Boot</p>
            </a>
          </div>
          <div className="footer-links-div">
            <h4>Swing Tech</h4>
            <a href="https://docs.oracle.com/en/java/" target="_blank">
              <p>Java Documentation</p>
            </a>
            <a href="https://react.dev/" target="_blank">
              <p>Node.js Documentation</p>
            </a>
            <a href="https://tailwindcss.com/" target="_blank">
              <p>Front-end Frameworks</p>
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
                <p>Privacy</p>
              </div>
            </a>
            <a href="#">
              <div>
                <p>Terms & Conditions</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
