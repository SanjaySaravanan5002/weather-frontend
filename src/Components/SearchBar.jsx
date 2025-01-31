import React from "react";

const SearchBar = ({ onSearch }) => {
  const [location, setLocation] = React.useState("");

  const handleSearch = () => {
    if (location) {
      onSearch(location);
    } else {
      alert("Please enter a location.");
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
