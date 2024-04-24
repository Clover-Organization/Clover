import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import './css/style.css';

import AsideAnnotation from "./components/asideAnnotation/AsideAnnotation";
import { useParams } from "react-router-dom";
import { fetchRequestById } from "../home/components/utils/fetchRequestById/fetchRequestById";
import { postNewAnnotation } from "./components/utils/postNewAnnotation/PostNewAnnotation";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { updateAnnotation } from "./components/utils/updateAnnotation/UpdateAnnotation";
import AnnotationContainer from "./components/annotationConteiner/AnnotationContainer";
import Modal from "../components/Modal";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const Annotation = () => {
  const token = localStorage.getItem("token");
  const [singleRequest, setSingleRequest] = useState({});
  const [selectedAnnotation, setSelectedAnnotation] = useState("");
  const initialCount = parseInt(localStorage.getItem('count')) || 0;
  const [count, setCount] = useState(initialCount);
  const { idProject } = useParams();
  const quillRef = useRef(null);

  const [newAnnotationName, setNewAnnotationName] = useState({
    title: "",
    id: "",
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const fetchProject = async () => {
    await fetchRequestById(token, idProject, setSingleRequest);
  };

  const handleUpdateName = async (id) => {
    await updateAnnotation(token, newAnnotationName, id, idProject);
    setModalIsOpen(false);
  }

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
            setNewAnnotationName={setNewAnnotationName}
            handleUpdateName={handleUpdateName}
            newAnnotationName={newAnnotationName}
            setModalIsOpen={setModalIsOpen}
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
                setNewAnnotationName={setNewAnnotationName}
                setModalUpdate={setModalIsOpen}
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

      <Modal isOpen={modalIsOpen} onClose={(() => setModalIsOpen(false))}>
        <Card>
          <CardHeader>
            <CardTitle>Update annotation name</CardTitle>
            <CardDescription>Change the name of your note.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project"
                value={newAnnotationName.title} // Ajuste para acessar a propriedade newTitle
                onChange={(e) => setNewAnnotationName({ ...newAnnotationName, title: e.target.value })} />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setModalIsOpen(false)}>Cancel</Button>
            <Button onClick={() => handleUpdateName(newAnnotationName.id)}>Save</Button>
          </CardFooter>
        </Card>
      </Modal>

    </main>
  );
};

export default Annotation;
