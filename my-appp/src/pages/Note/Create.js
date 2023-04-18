import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./Tool";
import "react-quill/dist/quill.snow.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { auth, notesCollectionRef } from "../../firebase-config";
import { useNavigate } from "react-router-dom";

function Create({ isAuth }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  let navigate = useNavigate();
  console.log(isAuth);
  const createNote = async () => {
    await addDoc(notesCollectionRef, {
      title,
      body,
      createAt: serverTimestamp(),
      editAt: serverTimestamp(),
      viewAt: serverTimestamp(),
    });
    navigate("/");
  };
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="container">
      <div className="wrapper">
        <div className="form-group">
          <div className="form-group">
            <input
              className="form-control"
              placeholder="title..."
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <EditorToolbar />
            <ReactQuill
              theme="snow"
              value={body}
              onChange={setBody}
              placeholder={"Write something awesome..."}
              modules={modules}
              formats={formats}
            />
            <label></label>
          </div>
          <button class="btn btn-primary" onClick={createNote}>
            新增
          </button>
        </div>

        {/* {title}
        {body} */}
      </div>
    </div>
  );
}

export default Create;
