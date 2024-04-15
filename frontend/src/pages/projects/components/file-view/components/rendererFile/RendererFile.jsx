import MarkDownViewer from "./components/markDownViewer/MarkDownViewer";
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
                        <PdfViewer pdfData={fileContent.data} />
                    </div>
                );
            case 'markdown':
                return (
                    <MarkDownViewer mdData={fileContent.data} />
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
                        <h1>Unsupported file</h1>
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
