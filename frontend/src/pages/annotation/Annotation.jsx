import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";

import AsideAnnotation from "./components/asideAnnotation/AsideAnnotation";
import { useParams } from "react-router-dom";
import { fetchRequestById } from "../home/components/utils/fetchRequestById/fetchRequestById";
import { CardDescription, CardTitle } from "@/components/ui/card";
import AnnotationContainer from "./components/annotationConteiner/AnnotationContainer";
import { postNewAnnotation } from "./components/utils/postNewAnnotation/PostNewAnnotation";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const Annotation = () => {
  const token = localStorage.getItem("token");
  const [singleRequest, setSingleRequest] = useState({});
  const [selectedAnnotation, setSelectedAnnotation] = useState("");
  const initialCount = parseInt(localStorage.getItem('count')) || 0;
  const [count, setCount] = useState(initialCount);
  const { idProject } = useParams();
  const quillRef = useRef(null);

  const fetchProject = async () => {
    await fetchRequestById(token, idProject, setSingleRequest);
  };

  const handlePostNewAnnotation = async () => {
    // Incrementa o valor de 'count'
    const newCount = count + 1;
    setCount(newCount);

    const title = `Annotation ${newCount}`;
    // Salva o novo valor de 'count' no localStorage
    localStorage.setItem('count', newCount.toString());

    // Descomente a linha abaixo para chamar a função que faz a requisição
    await postNewAnnotation(token, title, idProject, setSelectedAnnotation);
  }


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


  return (
    <main className="main-annotation-content">
      <Navbar idProject={idProject} />
      <section className="section-annotation-content">
        <aside>
          <AsideAnnotation
            idProject={idProject}
            singleRequest={singleRequest}
            setSelectedAnnotation={setSelectedAnnotation}
          />
        </aside>
        <article className="article-annotation-content">
          {selectedAnnotation !== null &&
            selectedAnnotation !== undefined &&
            selectedAnnotation !== "" ? (
            <>
              <AnnotationContainer
                quillRef={quillRef}
                selectedAnnotation={selectedAnnotation}
                idProject={idProject}
                handlePostNewAnnotation={handlePostNewAnnotation}
              />
            </>
          ) : (
            <>
              <div className="grid text-center">
                <CardTitle>Create a new note or open one!</CardTitle>
                <CardDescription>Document your code, add reference links as if you were using Word</CardDescription>
                <Separator className="my-4" />
                <Button onClick={handlePostNewAnnotation}>Create new Annotation</Button>
              </div>
            </>
          )}
        </article>
      </section>
    </main>
  );
};

export default Annotation;
