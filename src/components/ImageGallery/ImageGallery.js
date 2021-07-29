import React from "react";
import PropTypes from "prop-types";

import ImageGalleryItem from "../ImageGalleryItem";
import style from "./ImageGallery.module.css";

const ImageGallery = ({ images, showLargeImage }) => {
  return (
    <ul className={style.image_gallery}>
      {images.map(({ id, user, largeImageURL, webformatURL }) => (
        <ImageGalleryItem
          id={id}
          user={user}
          largeImageURL={largeImageURL}
          webformatURL={webformatURL}
          onClick={showLargeImage}
        />
      ))}
    </ul>
  );
};

ImageGallery.defaultProps = {
  images: PropTypes.shape({
    largeImageURL: "",
    webformatURL: "",
  }),
};

ImageGallery.propTypes = {
  images: PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string,
    webformatURL: PropTypes.string,
    showLargeImage: PropTypes.func.isRequired,
  }),
};

export default ImageGallery;
