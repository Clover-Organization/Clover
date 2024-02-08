 // Modal Functions
 export const openModal = (setModalIsOpen) => {
    document.body.style.overflow = "hidden";
    setModalIsOpen(true);
};

export const closeModal = (setModalIsOpen) => {
    document.body.style.overflow = "auto";
    setModalIsOpen(false);
};

export const openModalConfirm = (id, handleSomeAction, setModalConfirmIsOpen) => {
    document.body.style.overflow = "hidden";
    handleSomeAction(id)
    setModalConfirmIsOpen(true);
};

export const closeModalConfirm = (setModalConfirmIsOpen) => {
    document.body.style.overflow = "auto";
    setModalConfirmIsOpen(false);
};

export const openModalUpdate = (id, handleSomeAction, setEditedRequest, singleRequest, editedRequest, setModalUpdateIsOpen) => {
    document.body.style.overflow = "hidden";
    handleSomeAction(id)
    setEditedRequest({ ...singleRequest });
    setModalUpdateIsOpen(true);
};

export const closeModalUpdate = (setModalUpdateIsOpen) => {
    document.body.style.overflow = "auto";
    setModalUpdateIsOpen(false);
};

export const openModalDelete = (id, handleSomeAction, setModalDeleteIsOpen) => {
    document.body.style.overflow = "hidden";
    handleSomeAction(id)
    setModalDeleteIsOpen(true);
};

export const closeModalDelete = (setModalDeleteIsOpen) => {
    document.body.style.overflow = "auto";
    setModalDeleteIsOpen(false);
};

export const openModalFilter = (setModalFilterIsOpen) => {
    document.body.style.overflow = "hidden";
    setModalFilterIsOpen(true);
};

export const closeModalFilter = (setModalFilterIsOpen) => {
    document.body.style.overflow = "auto";
    setModalFilterIsOpen(false);
};

export const openModalUserUpdate = (setModalIsOpen, setEditData, userData) => {
    document.body.style.overflow = "hidden";
    setEditData({ ...userData })
    setModalIsOpen(true);
}
export const closeModalUserUpdate = (setModalIsOpen) => {
    document.body.style.overflow = "hidden";
    setModalIsOpen(false);
}