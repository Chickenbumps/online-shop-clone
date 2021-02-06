import React from "react";
import { Typography, Form, Input, Button } from "antd";
import { useState } from "react";
import FileUpload from "../../utils/FileUpload";
import axios from "axios";

const { Title } = Typography;
const continent = [
  { key: 1, value: "Africa" },
  { key: 2, value: "Europe" },
  { key: 3, value: "Asia" },
  { key: 4, value: "North America" },
  { key: 5, value: "South America" },
  { key: 6, value: "Autralia" },
  { key: 7, value: "Antarctica" },
];

function UploadPage(props) {
  const [input, setInput] = useState({
    title: "",
    description: "",
    price: 0,
    continentsKey: 1,
  });

  const [images, setImages] = useState([]);
  const { title, description, price, continentsKey } = input;
  const onChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };
  const updateImage = (newImages) => {
    setImages(newImages);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !price || !continentsKey || !images) {
      return alert("Fill all the fields.");
    }
    const variables = {
      writer: props.user.userData._id,
      title: title,
      description: description,
      price: price,
      images: images,
      continents: continentsKey,
    };
    axios.post("/api/product/uploadProduct", variables).then((res) => {
      if (res.data.success) {
        alert("Product Successfully Uploaded");
        props.history.push("/");
      } else {
        alert("Failed to upload Product");
      }
    });
  };
  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>Upload Product</Title>
      </div>
      <Form onSubmit={onSubmit}>
        <div>
          <FileUpload updateImage={updateImage} />
        </div>
        <br />
        <br />
        <label>Title</label>
        <Input.TextArea name="title" onChange={onChange} />
        <br />
        <br />
        <label>Description</label>
        <Input.TextArea name="description" onChange={onChange} />
        <br />
        <br />
        <label>Price($)</label>
        <Input name="price" onChange={onChange} type="number" />
        <select name="continentsKey" onChange={onChange}>
          {continent.map((c) => (
            <option key={c.key} value={c.key}>
              {c.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button onClick={onSubmit}>Submit</Button>
      </Form>
    </div>
  );
}

export default UploadPage;
