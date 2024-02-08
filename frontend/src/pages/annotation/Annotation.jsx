import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import seta from './assets/seta.png';
import menu from './assets/menu.png';

import AsideAnnotation from "./components/asideAnnotation/AsideAnnotation";
import { useParams } from "react-router-dom";
import { fetchRequestById } from "../home/components/utils/fetchRequestById/fetchRequestById";
import AnnotationContainer from "./components/annotationConteiner/AnnotationContainer";

const Annotation = () => {
  const token = localStorage.getItem("token");
  const [singleRequest, setSingleRequest] = useState({});
  const [selectedAnnotation, setSelectedAnnotation] = useState("");
  const [asideOpen, setAsideOpen] = useState(true);
  const { idProject } = useParams();
  const quillRef = useRef(null);

  const fetchProject = async () => {
    await fetchRequestById(token, idProject, setSingleRequest);
  };

  // Fetch requests when the component mounts
  useEffect(() => {
    fetchProject();
  }, []);

  // Fetch requests periodically (every 5 seconds)
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchProject();
    }, 5000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [token]);

  const toggleAside = () => {
    setAsideOpen((prevAsideOpen) => !prevAsideOpen);
  };

  return (
    <main className="main-annotation-content">
      <Navbar idProject={idProject} />
      <section className="section-annotation-content">
        <aside
          className={
            asideOpen
              ? "aside-annotation-content"
              : "aside-annotation-content-wd-0"
          }
        >
          {asideOpen && (
            <AsideAnnotation
              idProject={idProject}
              singleRequest={singleRequest}
              setSelectedAnnotation={setSelectedAnnotation}
            />
          )}
        </aside>
        <img src={seta} alt="menu" onClick={toggleAside} />
        <article className="article-annotation-content">
          {selectedAnnotation !== null &&
          selectedAnnotation !== undefined &&
          selectedAnnotation !== "" ? (
            <>
              <AnnotationContainer
                quillRef={quillRef}
                selectedAnnotation={selectedAnnotation}
                idProject={idProject}
              />
            </>
          ) : (
            <>
              <h2>Select one annotation!</h2>
            </>
          )}
        </article>
      </section>
    </main>
  );
};

export default Annotation;
