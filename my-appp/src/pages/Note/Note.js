import { Link } from "react-router-dom";
import NoteItem from "./Components/NoteList/NoteItem";
import { useEffect, useState } from "react";
import SearchBar from "./Components/Search/search";
import "./Note.css";
import AddIcon from "@mui/icons-material/Add";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { getDocs, orderBy, query, collection } from "firebase/firestore";
import searchNote from "./Components/Search/img/search.svg";
import trash from "./Components/Search/img/trash.svg";
import { db, auth } from "../../firebase-config";
import DeleteIcon from "@mui/icons-material/Delete";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ColorSelectOption from "./Components/Search/colorSelect";

function Note({ notePage, setNotePage, level }) {
  const [noteList, setNoteList] = useState([]);
  const [noteListFilter, setNoteListFilter] = useState([]);
  const [orderArr, setOrderArr] = useState("viewAt");
  const [order, setOrder] = useState("desc");
  const [color, setColor] = useState("");
  const getNotes = async () => {
    try {
      const notesCollectionRef = collection(db, notePage);
      const q = query(notesCollectionRef, orderBy(orderArr, order));
      const data = await getDocs(q);
      const list = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setNoteList(list);

      setNoteListFilter(list);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotes();
  }, [orderArr, order, notePage]);

  const selectChange = (e) => {
    setOrderArr(e.target.value);
  };

  const orderIsChange = (e) => {
    order === "desc" ? setOrder("asc") : setOrder("desc");
  };

  const pageIsChange = (e) => {
    if (notePage === "notes") {
      localStorage.setItem("noteWay", "noteDel");
      setNotePage("noteDel");
    } else {
      localStorage.setItem("noteWay", "notes");
      setNotePage("notes");
    }
  };
  console.log("*******", color);
  return (
    <div className="container">
      <div className="wrapper">
        <SearchBar
          noteList={noteList}
          setNoteListFilter={setNoteListFilter}
          searchFrom={notePage}
          level={level}
          color={color}
        />
        <div className="note-filter-tool">
          <div style={{ display: "flex" }}>
            <select
              class="form-select orderArr"
              style={{ cursor: "pointer" }}
              value={orderArr}
              onChange={selectChange}
            >
              <option value="viewAt">檢視時間</option>
              <option value="editAt">更新時間</option>
              <option value="createAt">創建時間</option>
            </select>
            <button type="button" class="btn btn-light" onClick={orderIsChange}>
              {order === "desc" ? (
                <i class="bi bi-arrow-up"></i>
              ) : (
                <i class="bi bi-arrow-down"></i>
              )}
            </button>
            <ColorSelectOption color={color} setColor={setColor} />
          </div>
          <div>
            <button
              type="button"
              class="btn btn-primary1"
              style={{ marginRight: "10px" }}
              onClick={pageIsChange}
            >
              {notePage === "notes" ? <DeleteIcon /> : <LibraryBooksIcon />}
            </button>

            <Link to={"/create"}>
              <button type="button" class="btn btn-primary1">
                <NoteAddIcon className="addicon" />
                新增文件
              </button>
            </Link>
          </div>
        </div>

        <Link to={"/create"}>
          <button type="button" class="btn btn-primary2 note-create-circle">
            <AddIcon style={{ fontSize: "50px" }}></AddIcon>
          </button>
        </Link>
        <div className="grid">
          {noteListFilter.length !== 0 ? (
            noteListFilter.map((note) => {
              const {
                title = "",
                body = "",
                id,
                allow = [],
                dateLineDel,
              } = note;
              console.log("LLLLL", dateLineDel);
              return (
                <NoteItem
                  key={id}
                  title={title}
                  body={body}
                  id={id}
                  noteList={noteList}
                  setNoteList={setNoteList}
                  createAt={note.createAt}
                  editAt={note.editAt}
                  viewAt={note.viewAt}
                  tag={note.tag}
                  owner={note.owner}
                  notePage={notePage}
                  allow={allow}
                  dateLineDel={dateLineDel}
                  noteListFilter={noteListFilter}
                />
              );
            })
          ) : (
            <>
              <div></div>
              <center>
                <img
                  src={notePage === "notes" ? searchNote : trash}
                  style={{
                    height: "290px",
                  }}
                ></img>
              </center>
              <div></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Note;
