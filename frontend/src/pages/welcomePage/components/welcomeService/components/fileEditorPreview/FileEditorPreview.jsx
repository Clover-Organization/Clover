import Editor from "@monaco-editor/react";

const FileEditorPreview = () => {

	const previewContent = `class Simple {  
        public static void main(String args[]) {  
           System.out.println("Hello World");     
        }  
     }`;
	return (
		<Editor
			className="editor-container"
			height="50vh"
			width="100%"
			language={"java"}
			defaultValue={previewContent}
			theme="vs-dark"
			options={{
				selectOnLineNumbers: true,
				scrollBeyondLastLine: false,
				automaticLayout: true,
				fontSize: `22px`,
				readOnly: true,
			}}
		/>
	);
};

export default FileEditorPreview;
