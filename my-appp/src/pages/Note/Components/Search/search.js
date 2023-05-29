import "./search.css";
import { useEffect, useState } from "react";
import { auth } from "../../../../firebase-config";

const SearchBar = ({
  noteList,
  setNoteListFilter,
  searchFrom,
  level,
  color,
}) => {
  const [search, setSearch] = useState("");

  const searchNotes = () => {
    setNoteListFilter(
      noteList.filter((notes) => {
        console.log("::::::::::::", color);
        return searchFrom === "notes" || searchFrom === "noteDel"
          ? (notes.title.toLowerCase().includes(search.toLowerCase()) ||
              notes.body
                .replace(/<\/?.+?>/g, "")
                .replace(/ /g, "")
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              notes.tag
                .map((x) => x.tagName)
                .filter((x) => x.toLowerCase().includes(search.toLowerCase()))
                .length > 0) &&
              (searchFrom === "noteDel"
                ? notes.owner[0].uid === auth.currentUser.uid ||
                  level === "admin"
                : notes) &&
              (color ? notes.tag.map((x) => x.color).includes(color) : notes)
          : notes.email.toLowerCase().includes(search.toLowerCase()) ||
              notes.name.toLowerCase().includes(search.toLowerCase());
      })
    );
  };

  // noteList
  //   .reduce((accumulator, currentValue) => {
  //     return accumulator.concat(currentValue);
  //   }, [])
  //   .filter((x) =>
  //     x.tag.map(
  //       (x) => search && x.tagName.toLowerCase().includes(search.toLowerCase())
  //     )
  //   );

  useEffect(() => {
    searchNotes();
  }, [search, noteList, color]);

  return (
    <center>
      <div
        className="searchBar-wrap"
        style={{
          display: "flex",
          width: "40%",
          justifyContent: "space-between",
        }}
      >
        <input
          style={{ width: "100%" }}
          type="text"
          placeholder="請輸入關鍵字"
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
