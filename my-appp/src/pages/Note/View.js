import { useParams, Link } from "react-router-dom";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function View(isAuth) {
  const { id } = useParams();
  const docNoteEditRef = doc(db, "notes", id);
  const [noteData, setNoteData] = useState([]);
  const docNoteRef = doc(db, "notes", id);
  let navigate = useNavigate();
  const getNoteData = async () => {
    try {
      const docSnap = await getDoc(docNoteRef);
      setNoteData(docSnap.data());
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    getNoteData();
  }, []);
  useEffect(() => {
    console.log(noteData.body);
    const viewNoteTime = async (id) => {
      await updateDoc(docNoteEditRef, {
        viewAt: serverTimestamp(),
      });
    };
    viewNoteTime();
  }, []);

  return (
    <div className="container">
      <div className="wrapper">
        <div className="form-group">
          <input
            className="form-control"
            placeholder="title..."
            value={noteData.title}
            disabled
          />
        </div>
        <div className="form-group">
          <div class="quill ">
            <div class="ql-container ql-snow">
              <div class="ql-editor ql-blank" data-gramm="false">
                <div dangerouslySetInnerHTML={{ __html: noteData.body }}></div>
              </div>
            </div>
          </div>
          <label></label>
        </div>
        <a href={"/edit/" + id}>
          <button class="btn btn-primary">修改</button>
        </a>
      </div>
    </div>
  );
}

export default View;
