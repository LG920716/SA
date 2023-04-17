import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./Tool";
import "react-quill/dist/quill.snow.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useNavigate } from "react-router-dom";

function Edit(isAuth) {
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const { id } = useParams();
  const docNoteEditRef = doc(db, "notes", id);

  let navigate = useNavigate();

  const getNoteEdit = async () => {
    try {
      const docSnap = await getDoc(docNoteEditRef);
      setEditTitle(docSnap.data().title);
      setEditBody(docSnap.data().body);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getNoteEdit();
  }, []);
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    const updateViewTime = async (id) => {
      await updateDoc(docNoteEditRef, {
        viewAt: serverTimestamp(),
      });
    };
    updateViewTime();
  }, []);
  const updateEditNote = async (id) => {
    await updateDoc(docNoteEditRef, {
      title: editTitle,
      body: editBody,
      editAt: serverTimestamp(),
      viewAt: serverTimestamp(),
    });
    navigate("/");
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="form-group">
          <div className="form-group">
            <input
              value={editTitle}
              className="form-control"
              placeholder="title..."
              onChange={(e) => setEditTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <EditorToolbar />
            <ReactQuill
              theme="snow"
              value={editBody}
              onChange={setEditBody}
              placeholder={"Write something awesome..."}
              modules={modules}
              formats={formats}
            />
            <label></label>
          </div>
          <button class="btn btn-primary" onClick={updateEditNote}>
            修改
          </button>
        </div>
      </div>
    </div>
  );
}

export default Edit;
