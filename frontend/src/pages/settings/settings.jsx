import { useState, useEffect } from 'react';
import { Aside } from './components/asideSettings/Aside';
import { ProfileSettings } from './components/profileSettings/ProfileSettings';
import { RequestSettings } from './components/requestSettings/RequestSettings';
import { Link, useParams } from 'react-router-dom';
import ScrollReveal from 'scrollreveal';
import Navbar from '../components/Navbar';
import EditorSettings from './components/editorSettings/EditorSettings';
import AlertPage from './components/alertPage/AlertPage';
import AsideResponsive from './components/asideResponsive/AsideResponsive';
[]
import { CircleUser, Menu, Package2, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

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
    <div className="flex min-h-screen w-full flex-col">
      <Navbar idProject={idProject} />
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <div className='menuConfig'>
            <div className="lg:hidden">
              <AsideResponsive select={select} setSelect={setSelect} idProject={idProject} isShare={isShare} />
            </div>
            <div className='hidden lg:block'>
              <Aside select={select} setSelect={setSelect} idProject={idProject} isShare={isShare} />
            </div>
          </div>
          <div className="grid gap-6">
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
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
