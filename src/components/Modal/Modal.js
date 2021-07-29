import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

const Modal = ({ largeImageURL, onClose }) => {
  const [isShowModal, setIsShowModal] = useState(true);

  useEffect(() => {
    console.log("Modal useEffect");

    if (isShowModal) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isShowModal]);

  const handleBackdropClick = (event) => {
    console.log("currentTarget: ", event.currentTarget);
    console.log("target: ", event.target);

    if (event.currentTarget === event.target) {
      onClose();
      setIsShowModal(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.code === "Escape") {
      console.log("Enter ESC, Modal close");

      onClose();
      setIsShowModal(false);
    }
  };

  return createPortal(
    <div className={styles.overlay} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>,
    modalRoot
  );
};

Modal.defaultProps = {
  largeImageURL: "",
};

Modal.propTypes = {
  largeImageURL: PropTypes.string,
};

export default Modal;
