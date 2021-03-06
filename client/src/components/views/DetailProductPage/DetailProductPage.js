import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import ProductInfo from "./Sections/ProductInfo";
import { useDispatch } from "react-redux";
import ProductImage from "./Sections/ProductImage";
import { addToCart } from "../../../_actions/user_actions";

function DetailProductPage(props) {
  const [product, setProduct] = useState([]);
  const productId = props.match.params.productId;
  const dispatch = useDispatch();
  console.log("props", props);
  useEffect(() => {
    axios
      .get(`/api/product/products_by_id?id=${productId}&type=single`)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.product[0]);
          setProduct(res.data.product[0]);
        }
      });
  }, []);

  const addToCartHandler = (productId) => {
    dispatch(addToCart(productId));
  };
  return (
    <div className="postPage" style={{ width: "100%", padding: "3rem 4rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>{product.title}</h1>
      </div>
      <br />
      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <ProductImage detail={product} />
        </Col>
        <Col lg={12} xs={24}>
          <ProductInfo detail={product} addToCart={addToCartHandler} />
        </Col>
      </Row>
    </div>
  );
}

export default DetailProductPage;
