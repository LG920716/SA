import { Link } from "react-router-dom";
import NoteItem from "./Components/NoteList/NoteItem";
import { useEffect, useState } from "react";
import SearchBar from "./Components/Search/search";
import "./Note.css";
import AddIcon from "@mui/icons-material/Add";
import { getDocs, orderBy, query } from "firebase/firestore";
import { notesCollectionRef } from "../../firebase-config";
import searchNote from "./Components/Search/search.svg";
import { useNavigate } from "react-router-dom";

function Note({ level }) {
  const [noteList, setNoteList] = useState([]);
  const [noteListFilter, setNoteListFilter] = useState([]);
  const [orderArr, setOrderArr] = useState("viewAt");
  const [order, setOrder] = useState("desc");

  let navigate = useNavigate();

  const q = query(notesCollectionRef, orderBy(orderArr, order));
  const getNotes = async () => {
    const data = await getDocs(q);
    const list = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setNoteList(list);
    setNoteListFilter(list);
  };

  useEffect(() => {
    if (level === "unCheck") {
      navigate("/nonUser");
    }
  }, [level]);

  console.log("levelNote", level);
  useEffect(() => {
    getNotes();
  }, [orderArr, order]);

  const selectChange = (e) => {
    setOrderArr(e.target.value);
  };

  const orderIsChange = (e) => {
    order === "desc" ? setOrder("asc") : setOrder("desc");
  };
  console.log(new Date().toLocaleString());

  return (
    <div className="container">
      <div className="wrapper">
        <SearchBar noteList={noteList} setNoteListFilter={setNoteListFilter} />
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
          </div>
          <Link to={"/create"}>
            <button type="button" class="btn btn-primary1">
              <AddIcon style={{ marginTop: "-2px", marginLeft: "-5px" }} />
              新增文件
            </button>
          </Link>
        </div>

        <Link to={"/create"}>
          <button type="button" class="btn btn-primary2 note-create-circle">
            <AddIcon style={{ fontSize: "50px" }}></AddIcon>
          </button>
        </Link>
        <div className="grid">
          {noteListFilter.length !== 0 ? (
            noteListFilter.map((note) => {
              const { title = "", body = "", id } = note;
              return (
                <NoteItem
                  key={id}
                  title={title}
                  body={body}
                  id={id}
                  noteList={noteList}
                  setNoteList={setNoteList}
                />
              );
            })
          ) : (
            <>
              <div></div>
              <center>
                <img
                  src={searchNote}
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
