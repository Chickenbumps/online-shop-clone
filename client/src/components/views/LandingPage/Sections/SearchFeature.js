import React, { useState } from "react";
import { Input } from "antd";

const { Search } = Input;

function SearchFeature(props) {
  const [searchTerms, setSearchTerms] = useState("");

  const onChangeSearch = (e) => {
    setSearchTerms(e.target.value);
    props.updateFuction(e.target.value);
  };
  return (
    <div>
      <Search
        value={searchTerms}
        onChange={onChangeSearch}
        placeholder="Search By Typing..."
      />
    </div>
  );
}

export default SearchFeature;
