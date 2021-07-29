import React from "react";
import PropTypes from "prop-types";

import style from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({
  id,
  user,
  largeImageURL,
  webformatURL,
  onClick,
}) => {
  console.log("onlickImage ~ onClick: ", onClick);

  const onClickImage = (e) => {
    console.log("onlickImage ~ e: ", largeImageURL);
    onClick({ largeImageURL });
  };

  return (
    <li key={id} className={style.image_gallery_item}>
      <img
        src={webformatURL}
        alt={user}
        className={style.image_gallery_item_image}
        onClick={onClickImage}
      />
    </li>
  );
};

ImageGalleryItem.defaultProps = {
  user: "Author",
  largeImageURL: "",
  webformatURL: "",
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.string,
  largeImageURL: PropTypes.string,
  webformatURL: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
