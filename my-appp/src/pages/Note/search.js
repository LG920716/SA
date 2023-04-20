import React from "react";
import "./search.css";

const SearchBar = ({ setSearch, search, searchNotes, setSearchClose }) => {
  const searchClose = () => {
    setSearch("");
    setSearchClose(true);
  };
  return (
    <div className="searchBar-wrap" 
    style={{display:"flex",
            width:"50%",
            justifyContent:"space-between",}}>
      <input style={{width:"100%"}}
        type="text"
        placeholder="關鍵字尋找"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {search && <span onClick={searchClose}>X</span>}
      <button onClick={searchNotes}>
        <i class="bi bi-search"></i>
      </button>
    </div>
  );
};

export default SearchBar;
