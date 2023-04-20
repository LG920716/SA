import { getDocs, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { db, notesCollectionRef } from "../../firebase-config";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import "./List.css"

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
    setSearchClose(false);
    getNotes();
  }, [orderChange, searchClose]);

  const deleteNote = async (id) => {
    const noteDoc = doc(db, "notes", id);
    await deleteDoc(noteDoc);
    getNotes();
  };

  return (
   
    <div
      style={{
        borderRadius:"20px",
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        rowGap:"2rem",
        justifyItems: "center",
        backgroundColor: "#F5F5F5",
        paddingTop:"30px",
        paddingBottom:"30px"
        
            }}
    >
      {noteList.map((note) => (
        <div key={note.id} 
        style={{ width: "400px",height:"363px", backgroundColor:"white", borderRadius: "20px"}}>
          {/* <p>Title: {note.title}</p>
          <p>Body: {note.body}</p> */}

<div className="form-group" >
 
            <input 
              className="form-control" 
              style={{

                borderRadius:"20px", 
                border:"0px",
                height:"60px",
                fontSize:"20px",
                backgroundColor:"white",
                fontWeight:"bold"}} 

              placeholder="title..."
              value={note.title}
              disabled
            />
            
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
                style={{ height: "264px", overflowY: "auto", border:"0px", }}
              >
                <div class="ql-editor ql-blank" data-gramm="false">
                  <div dangerouslySetInnerHTML={{ __html: note.body }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="btn-group" role="group" aria-label="Basic example" 
          style={{width:"100%", display:"flex", justifyContent:"space-evenly"}}>

            <Link to={"view/" + note.id}>
              <button type="button" class="btn btn-light" style={{width:"133.4px"}}>
                <FullscreenIcon />
              </button>
            </Link>
            <Link to={"edit/" + note.id}>
              <button type="button" class="btn btn-light" style={{width:"133.4px"}}>
                <EditIcon />
              </button>
            </Link>
            <a>
            <button
              type="button"
              style={{width:"133.4px"}}
              class="btn btn-light"
              onClick={() => {
                deleteNote(note.id);
              }}
            >
              <DeleteIcon />
            </button>
            </a>
          </div>
        </div>
      ))}
    </div>
  
  );
}

export default List;
