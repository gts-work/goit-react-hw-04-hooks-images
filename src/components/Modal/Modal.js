import React, { Component } from "react";
import PropTypes from "prop-types";

import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

export default class Modal extends Component {
  componentDidMount() {
    console.log("Modal componentDidMount");
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    console.log("Modal componentWillUnmount");
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      console.log("Enter ESC, Modal close");

      this.props.onClose();
    }
  };

  handleBackdropClick = (event) => {
    console.log("currentTarget: ", event.currentTarget);
    console.log("target: ", event.target);

    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={styles.overlay} onClick={this.handleBackdropClick}>
        <div className={styles.modal}>
          <img src={this.props.largeImageURL} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.defaultProps = {
  largeImageURL: "",
};

Modal.propTypes = {
  largeImageURL: PropTypes.string,
};
