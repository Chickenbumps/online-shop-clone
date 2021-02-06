import { Checkbox, Collapse } from "antd";
import React, { useState } from "react";
function CheckBox(props) {
  const [checkedList, setCheckedList] = useState([]);

  const handleToggle = (index) => {
    const newCheckedList = [...checkedList];
    const currentIndex = checkedList.indexOf(index);
    if (currentIndex === -1) {
      newCheckedList.push(index);
    } else {
      newCheckedList.splice(currentIndex, 1);
    }
    setCheckedList(newCheckedList);
    props.handleFilters(newCheckedList);
  };

  const renderCheckboxLists = () =>
    props.list &&
    props.list.map((continent, index) => (
      <React.Fragment key={index}>
        <Checkbox
          onChange={() => handleToggle(continent._id)}
          type="checkbox"
          checked={checkedList.indexOf(continent._id) === -1 ? false : true}
        />
        &nbsp;&nbsp;
        <span>{continent.name}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </React.Fragment>
    ));

  return (
    <div>
      <Collapse defaultActiveKey={["0"]}>
        <Collapse.Panel header="Continents" key="1">
          {renderCheckboxLists()}
        </Collapse.Panel>
      </Collapse>
    </div>
  );
}

export default CheckBox;
