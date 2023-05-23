import { useParams, useNavigate, Link } from "react-router-dom";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import EditIcon from "@mui/icons-material/Edit";
import Tag from "./Components/Tag/Tag";

function View() {
  const { id } = useParams();
  const [noteData, setNoteData] = useState([]);
  const docNoteRef = doc(db, "notes", id);
  console.log("id", id);
  let navigate = useNavigate();
  console.log("noteData", noteData);
  const [tagList, setTagList] = useState([]);

  useEffect(() => {
    const getNoteData = async () => {
      try {
        const docSnap = await getDoc(docNoteRef);
        setNoteData(docSnap.data());
        setTagList(docSnap.data().tag);
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
              <button
                type="button"
                class="note-tool"
                style={{
                  width: "60px",
                  height: "50px",
                  borderRadius: "5px 0px 0px 5px",
                }}
              >
                <EditIcon />
              </button>
            </Link>
            <Link to={"../"}>
              <button
                type="button"
                class="note-tool"
                style={{
                  width: "60px",
                  height: "50px",
                  borderRadius: "0px 5px 5px 0px",
                }}
              >
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
