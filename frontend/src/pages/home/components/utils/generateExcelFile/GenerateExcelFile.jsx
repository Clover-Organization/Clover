import React from 'react';
import Swal from 'sweetalert2';
export const GenerateExcelFile = async ({ allUsers, token, setFileUrl }) => {
    try {

        const url = allUsers ? 'http://localhost:8080/file/download/all' : 'http://localhost:8080/file/download';
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(new Blob([blob]));
            setFileUrl(url);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: `Failed to fetch data from API.`,
            });
        }
    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: `Error ${error}`,
        });
    }
};