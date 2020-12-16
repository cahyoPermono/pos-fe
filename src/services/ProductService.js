import axios from "axios";
import authHeader from "./AuthHeader";

const API_URL = "http://localhost:8080/api/product/";

class ProductService {
  getAllProduct() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  createProduct(newProduct) {
    return axios.post(API_URL, newProduct, { headers: authHeader() });
  }
}

export default new ProductService();
