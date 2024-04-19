import { uploadFiles } from '@/pages/projects/components/utils/uploadFiles/UploadFiles';
import { uploadFilesIntoFolder } from '@/pages/projects/components/utils/uploadsFilesIntoFolder/UploadFilesIntoFolder';

export const createFile = async (fileName, token, idProject, idFolder) => {
    // Verifica se o nome do arquivo possui uma extensão
    const hasExtension = /\.\w+$/.test(fileName);

    // Se não possuir uma extensão, adiciona a extensão .txt
    const finalFileName = hasExtension ? fileName : `${fileName}.txt`;

    try {
        // Cria um arquivo vazio
        const blob = new Blob([''], { type: 'text/plain;charset=utf-8' });

        // Cria um objeto de arquivo a partir do Blob
        const file = new File([blob], finalFileName, { type: 'text/plain' });

        // Chama a função de upload de arquivos
        !idFolder ? await uploadFiles(token, idProject, [file]) : await uploadFilesIntoFolder(token, idProject, [file], idFolder);

        console.log(`Arquivo "${finalFileName}" criado com sucesso.`);
    } catch (error) {
        console.error(`Erro ao criar o arquivo "${finalFileName}": ${error}`);
    }
};
