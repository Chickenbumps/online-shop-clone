import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";

function ProductImage(props) {
  const [images, setImages] = useState([]);
  useEffect(() => {
    if (props.detail.images && props.detail.images.length > 0) {
      let images = [];
      props.detail.images &&
        props.detail.images.map((image) => {
          images.push({
            original: `http://localhost:7000/${image}`,
            thumbnail: `http://localhost:7000/${image}`,
          });
        });
      setImages(images);
    }
  }, [props.detail]);
  return (
    <div>
      <ImageGallery items={images} />
    </div>
  );
}

export default ProductImage;
