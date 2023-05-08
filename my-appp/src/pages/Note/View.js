import { useParams, useNavigate, Link } from "react-router-dom";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import EditIcon from "@mui/icons-material/Edit";

function View() {
  const { id } = useParams();
  const [noteData, setNoteData] = useState([]);
  const docNoteRef = doc(db, "notes", id);
  console.log("id", id);
  let navigate = useNavigate();
  console.log("noteData", noteData);

  useEffect(() => {
    const getNoteData = async () => {
      try {
        const docSnap = await getDoc(docNoteRef);
        setNoteData(docSnap.data());
        console.log("geting", docSnap);
      } catch (error) {
        console.log(error);
      }
    };
    getNoteData();
  }, []);

  useEffect(() => {
    const viewNoteTime = async (id) => {
      try {
        await updateDoc(docNoteRef, {
          viewAt: serverTimestamp(),
        });
      } catch (error) {
        console.log(error);
      }
    };
    viewNoteTime();
  }, []);

  return (
    noteData && (
      <div className="container">
        <div className="wrapper" style={{ marginTop: "30px" }}>
          <div className="form-group1">
            <input
              className="form-control"
              placeholder="title..."
              value={noteData.title}
              disabled
            />
          </div>
          <div className="form-group2" style={{ marginBottom: "-20px" }}>
            <div class="quill ">
              <div class="ql-container ql-snow" style={{ height: "410px" }}>
                <div
                  class="ql-editor ql-blank"
                  data-gramm="false"
                  style={{ height: "100%" }}
                >
                  <div
                    dangerouslySetInnerHTML={{ __html: noteData.body }}
                  ></div>
                </div>
              </div>
            </div>
            <label></label>
          </div>
          <div>
            <Link to={"../edit/" + id}>
              <button type="button" class="note-tool" style={{ width: "60px" }}>
                <EditIcon />
              </button>
            </Link>
            <Link to={"../"}>
              <button type="button" class="note-tool" style={{ width: "60px" }}>
                <FullscreenExitIcon />
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  );
}

export default View;
