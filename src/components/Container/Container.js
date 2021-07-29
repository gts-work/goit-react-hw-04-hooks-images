import React from "react";
import PropTypes from "prop-types";

import style from "./Container.module.css";

const Container = ({ children }) => (
  <div className={style.container}>{children}</div>
);

Container.defaultProps = {
  children: "<></>",
};

Container.propTypes = {
  children: PropTypes.element,
};

export default Container;
