import "./search.css";
import { useEffect, useState } from "react";

const SearchBar = ({ noteList, setNoteListFilter }) => {
  const [search, setSearch] = useState("");

  const searchNotes = () => {
    setNoteListFilter(
      noteList.filter(
        (notes) =>
          notes.title.toLowerCase().includes(search.toLowerCase()) ||
          notes.body
            .replace(/<\/?.+?>/g, "")
            .replace(/ /g, "")
            .toLowerCase()
            .includes(search.toLowerCase())
      )
    );
  };

  noteList
    .reduce((accumulator, currentValue) => {
      return accumulator.concat(currentValue);
    }, [])
    .filter((x) =>
      x.tag.map(
        (x) => search && x.tagName.toLowerCase().includes(search.toLowerCase())
      )
    );

  useEffect(() => {
    searchNotes();
  }, [search, noteList]);

  return (
    <center>
      <div
        className="searchBar-wrap"
        style={{
          display: "flex",
          width: "50%",
          justifyContent: "space-between",
        }}
      >
        <input
          style={{ width: "100%" }}
          type="text"
          placeholder="關鍵字尋找"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && <span onClick={() => setSearch("")}>X</span>}
        <button onClick={searchNotes}>
          <i class="bi bi-search"></i>
        </button>
      </div>
    </center>
  );
};

export default SearchBar;
