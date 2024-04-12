import PdfViewer from "./components/pdfViewer/PdfViewer";

const RendererFile = ({ fileContent, singleRequest }) => {
    const getFileType = (fileName) => {
        const extension = fileName.split('.').pop().toLowerCase();
        switch (extension) {
            case 'pdf':
                return 'pdf';
            case 'md':
            case 'markdown':
                return 'markdown';
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
                return 'image';
            default:
                return 'other';
        }
    };

    const renderContent = () => {
        const fileType = getFileType(singleRequest.fileName);
        switch (fileType) {
            case 'pdf':
                return (
                    <div className="pdf-content">
                        <PdfViewer pdfData={singleRequest.data}/>
                    </div>
                );
            case 'markdown':
                return (
                    <div className="markdown-content">
                        {/* Renderizar Markdown */}
                    </div>
                );
            case 'image':
                return (
                    <div className="image-content">
                        <img src={fileContent.data} alt={singleRequest.fileName} />
                    </div>
                );
            case 'other':
            default:
                return (
                    <div className="other-content">
                        {/* Renderizar outros tipos de arquivo */}
                    </div>
                );
        }
    };

    return (
        <div>
            {renderContent()}
        </div>
    );
};

export default RendererFile;
