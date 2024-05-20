import ReactMarkdown from 'react-markdown';
import 'github-markdown-css';

const MarkDownViewer = ({ mdData }) => {
    return (
        <div className="markdown-body p-8">
            <ReactMarkdown children={mdData} />
        </div>
    );
};

export default MarkDownViewer;
