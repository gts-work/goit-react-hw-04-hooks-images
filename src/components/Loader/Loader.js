import React, { Component } from "react";
import LoaderItem from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import styles from "./Loader.module.css";

class Loader extends Component {
  render() {
    return (
      <div className={styles.div_loader}>
        <LoaderItem type="Oval" color="#00BFFF" height={60} width={60} />
      </div>
    );
  }
}

export default Loader;
