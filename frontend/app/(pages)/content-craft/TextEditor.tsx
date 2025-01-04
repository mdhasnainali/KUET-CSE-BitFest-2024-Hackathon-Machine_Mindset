
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const TextEditor = ({ setInput, input }: { setInput: any; input: any }) => {

  return <ReactQuill className=" h-40" theme="snow" value={input} onChange={setInput} />;
};

export default TextEditor;
