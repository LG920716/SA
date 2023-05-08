import { useState, useEffect } from "react";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { notesCollectionRef } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import Editor from "./Components/Editor/Editor";

function Create() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  let navigate = useNavigate();

  const createNote = async () => {
    await addDoc(notesCollectionRef, {
      title: title ? title : new Date().toLocaleString(),
      body,
      createAt: serverTimestamp(),
      editAt: serverTimestamp(),
      viewAt: serverTimestamp(),
      tag: [],
    });
    navigate("/");
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="editorTop">
          <Editor
            title={title}
            setTitle={setTitle}
            body={body}
            setBody={setBody}
          />
          <button class="btn btn-primary" onClick={createNote}>
            新增
          </button>
        </div>
      </div>
    </div>
  );
}

export default Create;
