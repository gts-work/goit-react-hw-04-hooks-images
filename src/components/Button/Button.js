import React from "react";
import PropTypes from "prop-types";

import styles from "./Button.module.css";

const Button = ({ onLoadMore }) => {
  return (
    <div className={styles.div_button}>
      <button className={styles.button} onClick={onLoadMore}>
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};

export default Button;
