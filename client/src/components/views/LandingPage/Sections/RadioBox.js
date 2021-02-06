import { Collapse, Radio } from "antd";
import React, { useState } from "react";
function RadioBox(props) {
  const [value, setValue] = useState("0");

  const onChange = (e) => {
    setValue(e.target.value);
    props.handleFilters(e.target.value);
  };

  const renderRadioBox = () =>
    props.list &&
    props.list.map((price) => (
      <Radio key={price._id} value={`${price._id}`}>
        {price.name}
      </Radio>
    ));
  return (
    <div>
      <Collapse defaultActiveKey={["0"]}>
        <Collapse.Panel header="price" key="1">
          <Radio.Group onChange={onChange} value={value}>
            {renderRadioBox()}
          </Radio.Group>
        </Collapse.Panel>
      </Collapse>
    </div>
  );
}

export default RadioBox;
