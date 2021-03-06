import axios from "axios";

export class ProductService {

  

 

  getProductsSmall() {
    return fetch("data/products-small.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }

  async getProducts() {
    const location = window.location.href.split('?');
    const id = location[location.length-1];
    var response = [];

    try {
     response = await axios.get(
      "http://localhost:4000/api/tienda/buscar?"+id,
      { withCredentials: true }
    );
    } catch (Error) {
      response = {data: []}
      console.log("No hay Productos por mostrar")

    }
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
