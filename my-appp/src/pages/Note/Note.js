import { Link } from "react-router-dom";
import List from "./List";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./search";
import "./Note.css";
import AddIcon from '@mui/icons-material/Add';

function Note({ isAuth }) {
  let navigate = useNavigate();
  const [noteList, setNoteList] = useState([]);
  const [orderArr, setOrderArr] = useState("viewAt");
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("desc");
  const [orderChange, setOrderChange] = useState([]);
  const [searchClose, setSearchClose] = useState(false);

  const searchNotes = () => {
    setNoteList(
      noteList.filter(
        (notes) =>
          notes.title.toLowerCase().includes(search.toLowerCase()) ||
          notes.body.replace(/<\/?.+?>/g,"").replace(/ /g,"").toLowerCase().includes(search.toLowerCase())
      )
    );
  };
  console.log("searchClose", searchClose);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);
  console.log("button", order);
  console.log("orderChange", orderChange);
  const selectChange = (e) => {
    setOrderArr(e.target.value);
    setOrderChange([orderArr, order]);
  };
  const orderIsChange = (e) => {
    order === "desc" ? setOrder("asc") : setOrder("desc");
    setOrderChange([orderArr, order]);
  };
  return (
    <div className="container">
      <div className="wrapper">
        <SearchBar
          search={search}
          setSearch={setSearch}
          searchNotes={searchNotes}
          setSearchClose={setSearchClose}
        />
        <div
          style={{
            display: "flex",
            marginTop:"-2.5rem",
            marginBottom: "1.25rem",

          }}
        >
         

          <select
            class="form-select"
            value={orderArr}
            onChange={selectChange}
            style={{ width: "9.375rem", height:"2.6875rem",marginRight: "0.9375rem" }}
          >
            <option value="viewAt">檢視時間</option>
            <option value="editAt">更新時間</option>
            <option value="createAt">創建時間</option>
          </select>
          <button type="button" class="btn btn-light" style={{marginRight:"60.625rem"}} onClick={orderIsChange}>
            {order === "desc" ? (
              <i class="bi bi-arrow-up"></i>
            ) : (
              <i class="bi bi-arrow-down"></i>
            )}
          </button>
          <Link to={"/create"}>
            <button
              
              type="button"
              class="btn btn-primary1"
              style={{
              zIndex:"99",borderRadius:"5%", border:"0px",height:"2.6875rem", width:"7rem",
              }}

            >
              新增文件
              <AddIcon></AddIcon>
            </button>
          </Link>
          <Link to={"/create"}>
            <button
              type="button"
              class="btn btn-primary2"
              style={{
                position:"fixed",right:"5%", top:"80%",
                width:"5.625rem", height:"5.625rem",
                zIndex:"99",borderRadius:"80%"
              }}
            >
              <AddIcon style={{fontSize:"50px", }}></AddIcon>
            </button>
          </Link>
        </div>
        <List
          orderArr={orderArr}
          order={order}
          orderChange={orderChange}
          noteList={noteList}
          setNoteList={setNoteList}
          searchClose={searchClose}
          setSearchClose={setSearchClose}
        />
      </div>
    </div>
  );
}

export default Note;
