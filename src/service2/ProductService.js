import axios from "axios";
export class ProductService {


  getProductsSmall() {
    console.log("Holaaa")
    return fetch("data/products-small.json")
      .then((res) => res.json())
      .then((d) => d.data);
    
  }

  async getProducts() {
    const response = await axios.get(
      "http://localhost:4000/api/tienda/ultimasVentas",
      { withCredentials: true }
    );
    //then((response) => { console.log(response) })
    if (response.data) {
      console.log(response.data);
      return response.data;
    }
  }

  getProductsWithOrdersSmall() {
    return fetch("data/products-orders-small.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }
}
