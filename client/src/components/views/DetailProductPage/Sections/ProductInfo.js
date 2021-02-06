import React, { useEffect, useState } from "react";
import { Button, Descriptions } from "antd";

const { Item } = Descriptions;
function ProductInfo(props) {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    console.log(props.detail);
    setProduct(props.detail);
  }, [props.detail]);

  const addtoCartHandler = () => {
    props.addToCart(props.detail._id);
  };
  return (
    <div>
      <Descriptions title="Product Info">
        <Item label="Price">{product["price"]}</Item>
        <Item label="Sold">{product["sold"]}</Item>
        <Item label="View">{product["views"]}</Item>
        <Item label="Description">{product["description"]}</Item>
      </Descriptions>
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          size="large"
          shape="round"
          type="danger"
          onClick={addtoCartHandler}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default ProductInfo;
