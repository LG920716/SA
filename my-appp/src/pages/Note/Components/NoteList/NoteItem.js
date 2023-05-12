import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebase-config";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import "./NoteItem.css";
import Swal from "sweetalert2";

function NoteItem({ title, body, id, noteList, setNoteList }) {
  const deleteNote = (id, email) => {
    Swal.fire({
      title: "確定刪除?",
      text: `將永久刪除這篇筆記`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "刪除",
      cancelButtonText: "取消",
    }).then((result) => {
      if (result.isConfirmed) {
        const del = async () => {
          const noteDoc = doc(db, "notes", id);
          await deleteDoc(noteDoc);
          setNoteList(noteList.filter((note) => note.id !== id));
        };
        del();
        Swal.fire({
          showConfirmButton: false,
          title: "刪除成功",
          icon: "success",
          timer: 1100,
        });
      }
    });
  };

  return (
    <div key={id} className="card" style={{ borderRadius: "20px", border: 0 }}>
      <div className="form-group">
        <input
          className="form-control"
          style={{
            borderRadius: "20px",
            border: "0px",
            height: "50px",
            fontSize: "20px",
            backgroundColor: "white",
            fontWeight: "bold",
          }}
          placeholder="title..."
          value={title}
          disabled
        />
      </div>

      <div className="form-group">
        <div class="quill " style={{ marginBottom: "30px" }}>
          <div
            class="ql-container ql-snow"
            style={{ height: "17rem", overflowY: "auto", border: "0px" }}
          >
            <div class="ql-editor ql-blank" data-gramm="false">
              <div dangerouslySetInnerHTML={{ __html: body }}></div>
            </div>
          </div>
        </div>
      </div>

      <div class="note-item-tool">
        <div className="tool-flex">
          <Link to={"view/" + id}>
            <div class="note-tool" style={{ borderRadius: " 0 0 0 20px" }}>
              <center>
                <FullscreenIcon />
              </center>
            </div>
          </Link>
        </div>
        <div className="tool-flex">
          <Link to={"edit/" + id}>
            <div class="note-tool">
              <center>
                <EditIcon />
              </center>
            </div>
          </Link>
        </div>
        <div
          class="note-tool tool-flex"
          style={{ borderRadius: " 0 0 20px 0", cursor: "pointer" }}
          onClick={() => {
            deleteNote(id);
          }}
        >
          <center>
            <DeleteIcon />
          </center>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
