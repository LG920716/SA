import { useParams, Link } from "react-router-dom";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import EditIcon from "@mui/icons-material/Edit";
import Tag from "./Components/Tag/Tag";
import { useNavigate } from "react-router-dom";
import MutiSelect from "./Components/MutiSelect/MutiSelect";

function View({ notePage, level }) {
  const { id } = useParams();
  const [noteData, setNoteData] = useState([]);
  const [uid, setUid] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [userSelectList, setUserSelectList] = useState([]);
  const docNoteRef = doc(db, notePage, id);

  let navigate = useNavigate();

  const [tagList, setTagList] = useState([]);

  useEffect(() => {
    const getNoteData = async () => {
      try {
        const docSnap = await getDoc(docNoteRef);
        setNoteData(docSnap.data());
        setTagList(docSnap.data().tag);
        setUid(auth?.currentUser?.uid);
        setUserSelectList(docSnap.data().allow);
      } catch (error) {
        navigate("/");
        console.log(error);
      }
    };
    getNoteData();
  }, []);

  useEffect(() => {
    if (
      notePage === "noteDel" &&
      noteData &&
      uid &&
      noteData.owner[0].uid !== uid &&
      level !== "admin"
    ) {
      navigate("/");
    } else if (
      noteData &&
      uid &&
      noteData.allow.map((x) => x.value).includes(uid) &&
      notePage !== "noteDel"
    ) {
      setEditOpen(true);
    }
  }, [noteData, uid]);

  useEffect(() => {
    const viewNoteTime = async (id) => {
      try {
        await updateDoc(docNoteRef, {
          viewAt: serverTimestamp(),
        });
      } catch (error) {
        navigate("/");
        console.log(error);
      }
    };
    notePage === "notes" && viewNoteTime();
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
          <div style={{ marginTop: "0.5rem" }}>
            <MutiSelect
              setUserSelectList={setUserSelectList}
              userSelectList={userSelectList}
              userFrom={"view"}
            />
            <Tag tagFrom={"view"} tagList={tagList} />
            <div
              style={{
                marginTop: "0.5rem",
                display: "flex",
                justifyContent: "end",
              }}
            >
              {editOpen && (
                <Link to={"../edit/" + id}>
                  <button
                    type="button"
                    class="note-tool"
                    style={{
                      width: "60px",
                      height: "41.59px",
                      borderRadius: "5px 0px 0px 5px",
                    }}
                  >
                    <EditIcon />
                  </button>
                </Link>
              )}

              <Link to={"../"}>
                <button
                  type="button"
                  class="note-tool"
                  style={{
                    width: "60px",
                    height: "41.59px",
                    borderRadius: "0px 5px 5px 0px",
                  }}
                >
                  <FullscreenExitIcon />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default View;
