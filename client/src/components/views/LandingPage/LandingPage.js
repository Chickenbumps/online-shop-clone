import { RocketFilled } from "@ant-design/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";
import { FaCode } from "react-icons/fa";
import ImageSlider from "../../utils/ImageSlider";
import CheckBox from "./Sections/CheckBox";
import RadioBox from "./Sections/RadioBox";
import { continents, price } from "./Sections/Data";
import SearchFeature from "./Sections/SearchFeature";

const { Meta } = Card;
function LandingPage() {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);
  const [postSize, setPostSize] = useState(0);
  const [filters, setFilters] = useState({
    continents: [],
    price: [],
  });
  const [searchTerms, setSearchTerms] = useState("");

  useEffect(() => {
    const variables = {
      skip: skip,
      limit: limit,
    };
    getProducts(variables);
  }, []);
  const getProducts = (variables) => {
    axios.post("/api/product/getProducts", variables).then((response) => {
      if (response.data.success) {
        console.log(response.data.products);
        if (variables.loadMore) {
          setProducts([...products, ...response.data.products]);
        } else {
          setProducts(response.data.products);
        }
        setPostSize(response.data.postSize);
      } else {
        alert("Failed to fetch product dates.");
      }
    });
  };
  const renderCards = products.map((product, index) => {
    return (
      <Col key={index} lg={6} md={8} xs={24}>
        <Card
          hoverable={true}
          cover={
            <a href={`/product/${product._id}`}>
              <ImageSlider images={product.images} />
            </a>
          }
        >
          <Meta title={product.title} description={`$${product.price}`} />
        </Card>
      </Col>
    );
  });

  const onLoadMore = () => {
    let size = skip + limit;
    const variables = {
      skip: size,
      limit: limit,
      loadMore: true,
      filters: filters,
    };
    getProducts(variables);
    setSkip(size);
  };
  const showFilteredResults = (filter) => {
    const variables = {
      skip: 0,
      limit: limit,
      filters: filter,
    };
    getProducts(variables);
    setSkip(0);
  };

  const handlePrice = (value) => {
    const data = price;
    let array = [];
    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    console.log("array", array);
    return array;
  };

  const handleFilters = (filter, category) => {
    const newFilters = { ...filters };
    newFilters[category] = filter;
    console.log(newFilters);
    if (category === "price") {
      let priceValues = handlePrice(filter);
      newFilters[category] = priceValues;
    }
    console.log(newFilters);
    showFilteredResults(newFilters);
    setFilters(newFilters);
  };

  const updateSearchTerms = (newSearchTerm) => {
    const variables = {
      skip: 0,
      limit: limit,
      filters: filters,
      searchTerms: newSearchTerm,
    };
    setSearchTerms(newSearchTerm);
    getProducts(variables);
  };

  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2>
          Let's Travel Anywhere <RocketFilled />
        </h2>
      </div>

      {/* Filter */}
      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <CheckBox
            list={continents}
            handleFilters={(filters) => handleFilters(filters, "continents")}
          />
        </Col>
        <Col lg={12} xs={24}>
          <RadioBox
            list={price}
            handleFilters={(filters) => handleFilters(filters, "price")}
          />
        </Col>
      </Row>
      {/* Search */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "1rem auto",
        }}
      >
        <SearchFeature updateFuction={updateSearchTerms} />
      </div>
      {products.length === 0 ? (
        <div
          style={{
            display: "flex",
            height: "300px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2> No post yet...</h2>
        </div>
      ) : (
        <div>
          <Row gutter={[16, 16]}>{renderCards}</Row>
        </div>
      )}
      <br />
      <br />
      {postSize >= limit && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={onLoadMore}>Load More</button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
