import React, { Component, useState, useEffect } from "react";

import Container from "./components/Container";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Loader from "./components/Loader";
import Button from "./components/Button";
import Modal from "./components/Modal";

import pixabayApi from "./services/pixabay-api";

export default function App() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [largeImageURL, setLargeImageURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [totalImages, setTotalImages] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("useEffect ~ useEffect: ", searchQuery);

    if (searchQuery) fetchImages();
  }, [searchQuery]);

  const fetchImages = () => {
    const options = { searchQuery, currentPage };
    console.log("App ~ options: ", options);

    setIsLoading(true);

    pixabayApi
      .fetchImages(options)
      .then((data) => {
        // console.log("APP pixabayApi ~ data: ", data);

        const imagesQuery = data.hits;
        const totalImages = data.total;

        setImages([...images, ...imagesQuery]);
        setTotalImages(totalImages);
        setCurrentPage(currentPage + 1);
        setError("");

        if (isLoadMore) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        }
      })
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  };

  const onChangeQuery = (query) => {
    console.log("App ~ query: ", query);

    setSearchQuery(query);
    setCurrentPage(1);
    setIsLoadMore(false);
    setImages([]);
    setError(null);
  };

  const onLoadMore = () => {
    setIsLoadMore(true);
    fetchImages();
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const showLargeImage = ({ largeImageURL }) => {
    console.log("App ~ url", largeImageURL);

    setLargeImageURL(largeImageURL);
    setShowModal(!showModal);
  };

  const diffCurrentLoadImages = totalImages - images.length;
  const isShowLoadMore =
    images.length > 0 && diffCurrentLoadImages > 0 && !isLoading;

  return (
    <Container>
      <Searchbar onSubmit={onChangeQuery} />
      {error && <p>{error}</p>}
      {images.length > 0 && (
        <ImageGallery showLargeImage={showLargeImage} images={images} />
      )}

      {isLoading && <Loader />}

      {isShowLoadMore && <Button onLoadMore={onLoadMore} />}

      {/* <Modal onClose={toggleModal}>
                    <p>MODAL</p>
                </Modal> */}

      {showModal && (
        <Modal largeImageURL={largeImageURL} onClose={toggleModal}></Modal>
      )}
    </Container>
  );
}
