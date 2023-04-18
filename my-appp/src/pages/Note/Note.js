import { Link } from "react-router-dom";
import List from "./List";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./search";

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
            marginBottom: "20px",
          }}
        >
          <Link to={"/create"}>
            <button
              type="button"
              class="btn btn-primary"
              style={{
                marginRight: "15px",
              }}
            >
              新增文件
            </button>
          </Link>

          <select
            class="form-select"
            value={orderArr}
            onChange={selectChange}
            style={{ width: "150px", marginRight: "15px" }}
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
