import { getDocs, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { db, notesCollectionRef } from "../../firebase-config";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function List({
  orderArr,
  order,
  orderChange,
  noteList,
  setNoteList,
  searchClose,
  setSearchClose,
}) {
  // const [toolShow, setToolShow] = useState(false);
  console.log(noteList);
  const q = query(notesCollectionRef, orderBy(orderArr, order));
  console.log(order);
  const getNotes = async () => {
    const data = await getDocs(q);
    setNoteList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getNotes();
    setSearchClose(false);
  }, [orderChange, searchClose]);

  const deleteNote = async (id) => {
    const noteDoc = doc(db, "notes", id);
    await deleteDoc(noteDoc);
    getNotes();
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gridGap: "2.5rem",
      }}
    >
      {noteList.map((note) => (
        <div key={note.id} style={{ width: "250px" }}>
          {/* <p>Title: {note.title}</p>
          <p>Body: {note.body}</p> */}

          <div class="btn-group" role="group" aria-label="Basic example">
            <Link to={"view/" + note.id}>
              <button type="button" class="btn btn-light">
                檢視
              </button>
            </Link>
            <Link to={"edit/" + note.id}>
              <button type="button" class="btn btn-light">
                修改
              </button>
            </Link>
            <button
              type="button"
              class="btn btn-light"
              onClick={() => {
                deleteNote(note.id);
              }}
            >
              刪除
            </button>
          </div>

          {/* <div class="select-menu">
          <button
            type="button"
            class="btn btn-primary"
            onClick={() => {
              toolShow ? setToolShow(false) : setToolShow(true);
            }}
          >
            <i class="bi bi-three-dots-vertical"></i>
          </button>
          {toolShow && (
            <ul class="options">
              <li class="option" onClick={() => setToolShow(false)}>
                <span className="option-text">Github</span>
              </li>
              <li class="option" onClick={() => setToolShow(false)}>
                <span className="option-text">Instagram</span>
              </li>
              <li class="option" onClick={() => setToolShow(false)}>
                <span className="option-text">Linkedin</span>
              </li>
            </ul>
          )}
          </div> */}

          <div className="form-group">
            <div class="quill ">
              <div
                class="ql-container ql-snow"
                style={{ height: "200px", overflowY: "auto" }}
              >
                <div class="ql-editor ql-blank" data-gramm="false">
                  <div dangerouslySetInnerHTML={{ __html: note.body }}></div>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="title..."
              value={note.title}
              disabled
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default List;
