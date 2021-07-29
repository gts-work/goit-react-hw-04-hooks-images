import axios from "axios";
import data from "./settings";

const instance = axios.create();
instance.defaults.baseURL = "https://pixabay.com/api/";
// instance.defaults.timeout = 2000;

// https://pixabay.com/api/?q=что_искать&page=номер_страницы&key=твой_ключ&image_type=photo&orientation=horizontal&per_page=12

const fetchImages = ({ searchQuery = "", currentPage = 1 }) => {
  const query = `?q=${searchQuery}&page=${currentPage}&key=${data.API_KEY}&image_type=photo&orientation=horizontal&per_page=${data.PER_PAGE}`;

  // console.log("fetchImages ~ searchQuery: ", searchQuery);
  // console.log("fetchImages ~ currentPage: ", currentPage);

  const userRequest = instance
    .get(`${query}`, {
      timeout: 10000,
    })
    .then((response) => response.data);
  return userRequest;
};

export default { fetchImages };
