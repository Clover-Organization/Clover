import { useState, useEffect } from 'react';
import { Aside } from './components/asideSettings/Aside';
import { ProfileSettings } from './components/profileSettings/ProfileSettings';
import { RequestSettings } from './components/requestSettings/RequestSettings';
import { useParams } from 'react-router-dom';
import ScrollReveal from 'scrollreveal';
import Navbar from '../components/Navbar';
import EditorSettings from './components/editorSettings/EditorSettings';
import AlertPage from './components/alertPage/AlertPage';
import AsideResponsive from './components/asideResponsive/AsideResponsive';

const Settings = () => {
  const { idProject } = useParams();
  const { selected } = useParams();
  const [select, setSelect] = useState(selected ? parseInt(selected) : 0);
  const isShare = localStorage.getItem("shareUser");

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
      <section className="flex items-baseline">
        <div className='menuConfig'>
          <div className="lg:hidden p-4">
            <AsideResponsive select={select} setSelect={setSelect} idProject={idProject} isShare={isShare} />
          </div>
          <div className='hidden lg:block p-8'>
            <Aside select={select} setSelect={setSelect} idProject={idProject} isShare={isShare} />
          </div>
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
