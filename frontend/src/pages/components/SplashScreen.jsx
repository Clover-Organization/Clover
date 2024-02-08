import { useEffect, useState } from "react";
import './style/Splash.css';
import ScrollReveal from 'scrollreveal';
import logo from './assets/PTCC.png';

const SplashScreen = () => {
    const [showSplash, setShowSplash] = useState(true);
    const [splashDisplay, setSplashDisplay] = useState({ display: 'grid' });

    useEffect(() => {
        const sr = ScrollReveal();
        const calculateDistance = () => {
            // Lógica para calcular a distância com base em fatores responsivos
            return window.innerWidth > 768 ? '70px' : '15px';
        };

        sr.reveal('.titleSplash', {
            origin: 'top',
            duration: 1000,
            distance: calculateDistance(),
            reset: true,
        });

        setTimeout(() => {
            setShowSplash(false);
            setTimeout(() => {
                setSplashDisplay({ display: 'none' });
            }, 500); // Tempo para a animação de fade-out
        }, 500); // Tempo para exibir o splash
    }, []);

    const splashClasses = showSplash ? 'SplashScreen fade-in' : 'SplashScreen fade-out';

    return (
        <div className={splashClasses} style={{ display: splashDisplay.display }}>
            <article>
                <div className="titleSplash">
                    <h1>Clover</h1>
                    <img src={logo} alt="Clover" />
                </div>
            </article>
        </div>
    );
}

export default SplashScreen;
