import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(import("react-quill"), { ssr: false });

interface DataProps {
  handleSetText: (text: string) => void;
}

const RichTextEditor: React.FC<DataProps> = ({ handleSetText }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    handleSetText(value);
  }, [value]);

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],
    ["link", "image"],
    ["clean"],
  ];

  const module = {
    toolbar: toolbarOptions,
  };

  return (
    <ReactQuill
      modules={module}
      theme="snow"
      value={value}
      onChange={setValue}
      placeholder="Procedimiento de la receta"
    />
  );
};

export default RichTextEditor;
