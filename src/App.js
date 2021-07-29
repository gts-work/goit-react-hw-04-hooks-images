import React, { Component } from "react";
import LoaderItem from "react-loader-spinner";

import Container from "./components/Container";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Loader from "./components/Loader";
import Button from "./components/Button";
import Modal from "./components/Modal";

import pixabayApi from "./services/pixabay-api";

export default class App extends Component {
  state = {
    images: [],
    searchQuery: "",
    currentPage: 1,
    largeImageURL: "",
    isLoading: false,
    totalImages: 0,
    showModal: false,
    isLoadMore: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { currentPage, searchQuery } = this.state;
    const options = { searchQuery, currentPage };
    // console.log("App ~ options: ", options);

    this.setState({ isLoading: true });

    pixabayApi
      .fetchImages(options)
      .then((data) => {
        console.log("APP pixabayApi ~ data: ", data);

        const imagesQuery = data.hits;
        const totalImages = data.total;
        this.setState((prevState) => ({
          images: [...prevState.images, ...imagesQuery],
          totalImages: totalImages,
          currentPage: prevState.currentPage + 1,
        }));
        this.setState({ error: "" });

        if (this.state.isLoadMore) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        }
      })
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  onChangeQuery = (query) => {
    console.log("App ~ query: ", query);
    this.setState({
      searchQuery: query,
      currentPage: 1,
      isLoadMore: false,
      images: [],
      error: null,
    });
  };

  onLoadMore = () => {
    this.setState({ isLoadMore: true });
    this.fetchImages();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  showLargeImage = ({ largeImageURL }) => {
    console.log("App ~ url", largeImageURL);

    this.setState({
      largeImageURL: largeImageURL,
      showModal: !this.state.showModal,
    });
  };

  render() {
    const { images, isLoading, totalImages, showModal, largeImageURL, error } =
      this.state;
    const diffCurrentLoadImages = totalImages - images.length;
    const isShowLoadMore =
      images.length > 0 && diffCurrentLoadImages > 0 && !isLoading;

    return (
      <Container>
        <Searchbar onSubmit={this.onChangeQuery} />
        {error && <p>{error}</p>}
        {images.length > 0 && (
          <ImageGallery showLargeImage={this.showLargeImage} images={images} />
        )}

        {isLoading && <Loader />}

        {isShowLoadMore && <Button onLoadMore={this.onLoadMore} />}

        {/* <Modal onClose={this.toggleModal}>
                    <p>MODAL</p>
                </Modal> */}

        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            onClose={this.toggleModal}
          ></Modal>
        )}
      </Container>
    );
  }
}

// export default App;
