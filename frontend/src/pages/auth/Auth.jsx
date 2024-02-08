import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import ScrollReveal from 'scrollreveal';
import Register from "./register/Register";
import Login from "./login/Login";
import './components/style.css';
import logo from '../components/assets/PTCC.png';
import Icon from "../components/Icon";

const Auth = () => {
  const [isLoginVisible, setLoginVisible] = useState(false);
  const [transitionClass, setTransitionClass] = useState('');

  const toggleForm = () => {
    setTransitionClass('fade-out');
    setTimeout(() => {
      setLoginVisible(!isLoginVisible);
      setTransitionClass('fade-in');
    }, 200);
  };

  useEffect(() => {
    setTransitionClass('fade-in');
  }, []);

  useEffect(() => {
    const sr = ScrollReveal();

    const calculateDistance = () => {
      return window.innerWidth > 768 ? '70px' : '15px';
    };

    sr.reveal('.authFieldset', {
      origin: 'top',
      duration: 2000,
      distance: calculateDistance(),
      reset: true,
    });

    sr.reveal('.logo', {
      origin: 'left',
      duration: 2000,
      distance: calculateDistance(),
      reset: true,
    });
  }, []);

  return (
    <main className={`authMain ${transitionClass}`}>
      <div className="logo">
        <Link to={"/"}>
          <Icon src={logo} alt="logo" />
        </Link>
      </div>

      {isLoginVisible ? <Login toggleForm={toggleForm} /> : <Register toggleForm={toggleForm} />}
    </main>
  );
};

export default Auth;
