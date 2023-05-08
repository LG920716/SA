import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import Editor from "./Components/Editor/Editor";

function Edit() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { id } = useParams();
  const docNoteEditRef = doc(db, "notes", id);

  let navigate = useNavigate();

  useEffect(() => {
    const getNoteEdit = async () => {
      try {
        const docSnap = await getDoc(docNoteEditRef);
        setTitle(docSnap.data().title);
        setBody(docSnap.data().body);
      } catch (error) {
        console.log(error);
      }
    };
    getNoteEdit();
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
      title: title ? title : new Date().toLocaleString(),
      body,
      editAt: serverTimestamp(),
      viewAt: serverTimestamp(),
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
          <button class="btn btn-primary" onClick={updateEditNote}>
            修改
          </button>
        </div>
      </div>
    </div>
  );
}

export default Edit;
