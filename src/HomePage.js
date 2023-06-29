import React, { useState } from "react";
import data from "./celebrities.json";
import Celebrity from "./Celebrity";

const HomePage = () => {
  const [flag, setFlag] = useState(false);
  const [search, setSearch] = useState("");
  const [openItemId, setOpenItemId] = useState(null);
  const [data1, setData1] = useState(data);

  const changeFlag = () => {
    setFlag(!flag);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const handleDelete = (index) => {
    const updatedData = [...data1];
    updatedData.splice(index, 1);
    setData1(updatedData);
  };

  const onItemClick = (id) => {
    setOpenItemId(id === openItemId ? null : id);
  };
  
  return (
    <>
      <input
        className="search-box"
        type="text"
        value={search}
        placeholder="🔍 Search"
        onChange={handleSearch}
      />
      {data1
        .filter(
          (item) =>
            item.first.toLowerCase().includes(search) ||
            item.last.toLowerCase().includes(search)
        )
        .map((item, index) => (
          <Celebrity
            key={item.id}
            data={item}
            isOpen={item.id === openItemId}
            onItemClick={() => onItemClick(item.id)}
            onDelete={() => handleDelete(index)}
            changeFlag={changeFlag}
            flag={flag}
          />
        ))}
    </>
  );
};
export default HomePage;
