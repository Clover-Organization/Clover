import '../../style/style.css';
import iconDatabase from './assets/iconDatabase.png';
import iconColaboracao from './assets/iconColaboracao.png';
import iconCheck from './assets/iconCheck.png';

const WelcomeService = () => {
    return (
        <section className="WelcomeServiceSection">
            <div className="title-service">
                <h2>Services</h2>
            </div>
            <article className="WelcomeServiceArticle">
                <div className="TxtWelcomeServices">
                    <img src={iconDatabase} alt="Database" />
                    <h2>Requests</h2>
                    <span>Request work that will be stored in the database awaiting a response</span>
                </div>

                <div className="TxtWelcomeServices">
                    <img src={iconColaboracao} alt="colaboration" />
                    <h2>Interaction</h2>
                    <span>Interaction between users to manage requests</span>
                </div>

                <div className="TxtWelcomeServices">
                    <img src={iconCheck} alt="colaboration" />
                    <h2>Checks</h2>
                    <span>Deadlines for deliveries and check to return service to the recipient</span>
                </div>
            </article>
        </section>
    )
}
export default WelcomeService;