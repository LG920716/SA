import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import Editor from "./Components/Editor/Editor";
import Tag from "./Components/Tag/Tag";

function Edit() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { id } = useParams();
  const docNoteEditRef = doc(db, "notes", id);
  const [tagList, setTagList] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    const getNoteEdit = async () => {
      try {
        const docSnap = await getDoc(docNoteEditRef);
        setTitle(docSnap.data().title);
        setBody(docSnap.data().body);
        setTagList(docSnap.data().tag);
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
      tag: tagList ? tagList : [],
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1rem",
            }}
          >
            <Tag tagList={tagList} setTagList={setTagList} tagFrom={"edit"} />
            <button class="btn btn-primary" onClick={updateEditNote}>
              修改
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
