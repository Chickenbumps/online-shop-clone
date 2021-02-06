import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
function FileUpload(props) {
  const [images, setImages] = useState([]);
  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);
    //save the Image we chose inside the Node Server
    axios
      .post("/api/product/uploadImage", formData, config)
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.image);
          setImages([...images, response.data.image]);
          props.updateImage([...images, response.data.image]);
        } else {
          alert("Failed to save the Image in Server");
        }
      });
  };
  const onDelete = (image) => {
    const imageIndex = images.indexOf(image);
    let newImages = [...images];
    newImages.splice(imageIndex, 1);
    setImages(newImages);
    props.updateImage(newImages);
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {/*Drop zone*/}
      <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: "300px",
              height: "240px",
              border: "1px solid lightgray",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <PlusOutlined
              style={{ fontSize: "5rem", maxWidth: "100%", maxHeight: "100%" }}
            />
          </div>
        )}
      </Dropzone>
      <div
        style={{
          display: "flex",
          width: "350px",
          height: "240px",
          overflow: "scroll",
        }}
      >
        {images.map((image, index) => (
          <div key={index} onClick={() => onDelete(image)}>
            <img
              style={{ minWidth: "300px", width: "300px", height: "240px" }}
              src={`http://localhost:7000/${image}`}
              alt={`productiong-${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
