import React, { Component } from "react";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { ProductService } from "../../serviceCopy/ProductService";
import { Rating } from "primereact/rating";
import { useRouter } from "next/router";

export class DataViewDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: null,
      layout: "grid",
      sortKey: null,
      sortOrder: null,
      sortField: null,
    };

    this.sortOptions = [
      { label: "Price High to Low", value: "!price" },
      { label: "Price Low to High", value: "price" },
    ];

    this.productService = new ProductService();
    this.itemTemplate = this.itemTemplate.bind(this);
    this.onSortChange = this.onSortChange.bind(this);
  }

  componentDidMount() {
    this.productService
      .getProducts()
      .then((data) => this.setState({ products: data }));
  }

  onSortChange(event) {
    const value = event.value;

    if (value.indexOf("!") === 0) {
      this.setState({
        sortOrder: -1,
        sortField: value.substring(1, value.length),
        sortKey: value,
      });
    } else {
      this.setState({
        sortOrder: 1,
        sortField: value,
        sortKey: value,
      });
    }
  }

  renderListItem(data) {
    return (
      <div className="col-12">
        <div className="product-list-item">
          <img
            src={`http://localhost:4000/uploads/${data.foto}`}
            onError={(e) =>
              (e.target.src =
                "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
            }
          />
          <div className="product-list-detail">
            <div className="product-name">{data.producto}</div>
            {/* <div className="product-description">{data.descripcion}</div> */}
            <Rating value={data.rating} readOnly cancel={false}></Rating>
            <i className="pi pi-tag product-category-icon"></i>
            <span className="product-category">{data.categoria}</span>
          </div>
          <div className="product-list-action">
            <span className="product-price">L.{data.precio}</span>

            <a href={"/product/" + data.idVenta}>
              <Button icon="pi pi-shopping-cart" label="Ver más"></Button>
            </a>

            <span
              className={`product-badge status-${data.estado.toLowerCase()}`}
            >
              {data.estado}
            </span>
          </div>
        </div>
      </div>
    );
  }

  renderGridItem(data) {
    return (
      <div className="col-12 md:col-4">
        <div className="product-grid-item card-products">
          <div className="product-grid-item-top">
            <div>
              <i className="pi pi-tag product-category-icon"></i>
              <span className="product-category">{data.categoria}</span>
            </div>
            <span
              className={`product-badge status-${data.estado.toLowerCase()}`}
            >
              {data.estado}
            </span>
          </div>
          <div className="product-grid-item-content  imagenes">
            <img
              src={`http://localhost:4000/uploads/${data.foto}`}
              onError={(e) =>
                (e.target.src =
                  "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
              }
              alt={data.nombre}
            />
            <div className="product-name">{data.producto}</div>
            <div className="product-description"></div>
            <Rating value={data.calificacion} cancel={false}></Rating>
          </div>
          <div className="product-grid-item-bottom">
            <span className="product-price">L. {data.precio}</span>
            <a href={"/product/" + data.idVenta}>
              <Button icon="pi pi-shopping-cart" label="Ver más"></Button>
            </a>
          </div>
        </div>
      </div>
    );
  }

  itemTemplate(product, layout) {
    if (!product) {
      return;
    }

    if (layout === "list") return this.renderListItem(product);
    else if (layout === "grid") return this.renderGridItem(product);
  }

  renderHeader() {
    return (
      <div className="grid grid-nogutter">
        {/* <div className="col-6" style={{ textAlign: "left" }}>
          <Dropdown
            options={this.sortOptions}
            value={this.state.sortKey}
            optionLabel="label"
            placeholder="Sort By Price"
            onChange={this.onSortChange}
          />
        </div> */}
        <div className="col-6" style={{ textAlign: "right" }}>
          <DataViewLayoutOptions
            layout={this.state.layout}
            onChange={(e) => this.setState({ layout: e.value })}
          />
        </div>
      </div>
    );
  }

  render() {
    const header = this.renderHeader();

    return (
      <div className="dataview-demo">
        <div className="card-products">
          <DataView
            value={this.state.products}
            layout={this.state.layout}
            header={header}
            itemTemplate={this.itemTemplate}
            paginator
            rows={9}
            sortOrder={this.state.sortOrder}
            sortField={this.state.sortField}
          />
        </div>
      </div>
    );
  }
}

export default DataViewDemo;
