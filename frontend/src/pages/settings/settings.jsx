import { useState, useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import Navbar from '../components/Navbar';
import { Aside } from './components/asideSettings/Aside';
import { ProfileSettings } from './components/profileSettings/ProfileSettings';

import seta from './assets/seta.png'
import { RequestSettings } from './components/requestSettings/RequestSettings';
import { useParams } from 'react-router-dom';
import EditorSettings from './components/editorSettings/EditorSettings';
import AlertPage from './components/alertPage/AlertPage';

const Settings = () => {
  const [asideOpen, setAsideOpen] = useState(true);
  const { idProject } = useParams();
  const { selected } = useParams();
  const [select, setSelect] = useState(selected ? parseInt(selected) : 0);
  const isShare = localStorage.getItem("shareUser");

  const toggleAside = () => {
    setAsideOpen((prevAsideOpen) => !prevAsideOpen);
  };

  useEffect(() => {
    const sr = ScrollReveal();

    const calculateDistance = () => {
      return window.innerWidth > 768 ? '100px' : '0px';
    };

    sr.reveal('.headerLogoName', {
      origin: 'left',
      duration: 1000,
      distance: calculateDistance(),
      reset: true,
    });
    sr.reveal('.information-user-content', {
      origin: 'left',
      duration: 1000,
      distance: calculateDistance(),
      reset: true,
    });
    sr.reveal('.menuConfig', {
      origin: 'left',
      duration: 1000,
      distance: calculateDistance(),
      reset: true,
    });
    sr.reveal('.userImage', {
      origin: 'top',
      duration: 1000,
      distance: calculateDistance(),
      reset: true,
    });
  }, []);

  return (
    <main className="main-settings-content">
      <Navbar idProject={idProject} />
      <section className="section-settings-content">
        <div className='menuConfig'>
          {asideOpen && <Aside select={select} setSelect={setSelect} idProject={idProject} isShare={isShare} />}
          <img src={seta} alt="menu" onClick={toggleAside} />
        </div>
        {select === 0 && (
          <ProfileSettings />
        )}

        {select === 1 && isShare === "false" && (
          <RequestSettings idProject={idProject} isShare={isShare} />
        )}

        {select === 1 && isShare !== "false" && (
          <AlertPage />
        )}

        {select === 2 && (
          <EditorSettings idProject={idProject} />
        )}

      </section>
    </main>
  );
};

export default Settings;
