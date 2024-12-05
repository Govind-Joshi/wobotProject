import React,{useState,useEffect} from "react";
import "../css/SearchBar.css"
import Search_bar from "../icon/Search_bar.png"
function SearchBar({callback_search,searchQuery}) {

    const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);  // SEARCH FUNCTION WITH DEBOUNCE FUNCTIONALITY .....

    {/*here i apply debouncing with 600 miliseconds delay 
       if user type multiple input with in 600 miliseconds then it clear priviouse timeout
       with help of clean up function and again set a new time out of 
       600 miliseconds    
        */}
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        callback_search(debouncedQuery); 
      }, 600);
  
  
      return () => clearTimeout(timeoutId);
    }, [debouncedQuery, callback_search]);
  
    const handleSearchChange = (e) => {
      setDebouncedQuery(e.target.value);
    };
  

    

  return (
    <div className="search-bar-container">

      <div className="search-bar-left">
        <h1 className="search-bar-title">Cameras</h1>
        <p className="search-bar-subtitle">Manage your cameras here.</p>
      </div>


      <div className="search-bar-right">
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          value={debouncedQuery}
          onChange={handleSearchChange}
        />
        <button className="search-button">
          <img src={Search_bar} className="search-icon"></img>
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
