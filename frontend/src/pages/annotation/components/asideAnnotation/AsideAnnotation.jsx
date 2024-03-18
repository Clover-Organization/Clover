import React, { useState, useEffect } from 'react';
import file from '../../../projects/assets/fileIcon.png';
import add from '../../assets/add.png';
import { postNewAnnotation } from '../utils/postNewAnnotation/PostNewAnnotation';
import Modal from '../../../components/Modal';
import { updateAnnotation } from '../utils/updateAnnotation/UpdateAnnotation';
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
import { Button } from "@/components/ui/button"

const AsideAnnotation = ({ idProject, singleRequest, setSelectedAnnotation }) => {

    // Recupera o valor de 'count' do localStorage ou define como 0 se não existir
    const initialCount = parseInt(localStorage.getItem('count')) || 0;
    const [count, setCount] = useState(initialCount);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newAnnotationName, setNewAnnotationName] = useState({
        title: "",
        id: "",
    });

    const token = localStorage.getItem('token');

    const handlePostNewAnnotation = async () => {
        // Incrementa o valor de 'count'
        const newCount = count + 1;
        setCount(newCount);

        const title = `Annotation ${newCount}`;
        // Salva o novo valor de 'count' no localStorage
        localStorage.setItem('count', newCount.toString());

        // Descomente a linha abaixo para chamar a função que faz a requisição
        await postNewAnnotation(token, title, idProject);
    }

    const handleUpdateName = async (id) => {
        await updateAnnotation(token, newAnnotationName, id, idProject);
    }

    return (
        <>
            <div className="div-aside-title-annotation">
                <h3>New Annotation</h3>
                <img src={add} alt="add" onClick={handlePostNewAnnotation} />
            </div>

            <nav className="nav-annotation-scroll">
                <ul className="ul-annotation-content">
                    {Array.isArray(singleRequest.annotations) && singleRequest.annotations.length > 0 ? (
                        singleRequest.annotations.map((annotation, index) => (
                            <div key={annotation.idAnnotation} onClick={() => setSelectedAnnotation(annotation)}>
                                <img src={file} alt="fileIcon" />
                                <li onDoubleClick={() => { setModalIsOpen(true), setNewAnnotationName({ title: annotation.title, id: annotation.idAnnotation }); }}>{annotation.title}</li>
                            </div>
                        ))
                    ) : (
                        <li>Create a new annotation!</li>
                    )}
                </ul>
            </nav>

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

        </>
    )
}

export default AsideAnnotation;
