import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./Tool";
import "react-quill/dist/quill.snow.css";
import "./Editor.css";

function Editor({ title, setTitle, body, setBody }) {
  return (
    <>
      <input
        style={{ borderRadius: "0" }}
        value={title}
        className="form-control"
        placeholder="標題..."
        onChange={(e) => setTitle(e.target.value)}
      />
      <EditorToolbar />
      <ReactQuill
        className="editorBottom"
        theme="snow"
        value={body}
        onChange={setBody}
        placeholder={"內文..."}
        modules={modules}
        formats={formats}
      />
    </>
  );
}

export default Editor;
