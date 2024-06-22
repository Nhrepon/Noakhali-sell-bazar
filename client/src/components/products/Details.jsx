import React, { useState } from "react";
import ProductStore from "../../store/ProductStore";
import DetailSkeleton from "../../skeleton/DetailSkeleton";
import ProductImage from "../../components/products/ProductImage";
import parse from "html-react-parser";
import ReviewComponent from "../../components/products/ReviewComponent";

const Details = () => {
  const { productDetails } = ProductStore();

  const [quantity, setQuantity] = useState(1);
  const incrementQty = () => {
    setQuantity((quantity) => quantity + 1);
  };
  const decrementQty = () => {
    if (quantity > 1) {
      setQuantity((quantity) => quantity - 1);
    }
  };

  if (productDetails === null) {
    return <DetailSkeleton />;
  } else {
    return (
      <div>
        <div className="container mt-2">
          <div className="row">
            <div className="col-md-7 p-3">
              <ProductImage />
            </div>
            <div className="col-md-5 p-3">
              <h4>{productDetails[0]["title"]}</h4>
              <p className="text-muted bodySmal my-1">
                Category: {productDetails[0]["category"]["categoryName"]}
              </p>
              <p className="text-muted bodySmal my-1">
                Brand: {productDetails[0]["brand"]["brandName"]}
              </p>
              <p className="bodySmal mb-2 mt-1">
                {productDetails[0]["description"]}
              </p>
              <p>
                Price:
                {productDetails[0]["discount"] == true ? (
                  <span>
                    <strike class="text-secondary">
                      {" "}
                      {productDetails[0]["price"]}
                    </strike>{" "}
                    {productDetails[0]["discountPrice"]}
                  </span>
                ) : (
                  <span> {productDetails[0]["price"]} </span>
                )}
              </p>

              <div className="row">
                <div className="col-4 p-2">
                  <label className="bodySmal">Size</label>
                  <select className="form-control my-2 form-select">
                    <option value="">Size</option>
                    {productDetails[0]["details"]["size"]
                      .split(",")
                      .map((item, i) => {
                        return <option value={item}>{item}</option>;
                      })}
                  </select>
                </div>
                <div className="col-4 p-2">
                  <label className="bodySmal">Color</label>
                  <select className="form-control my-2 form-select">
                    <option value="">Color</option>
                    {productDetails[0]["details"]["color"]
                      .split(",")
                      .map((item, i) => {
                        return <option value={item}>{item}</option>;
                      })}
                  </select>
                </div>
                <div className="col-4 p-2">
                  <label className="bodySmal">Quantity</label>
                  <div className="input-group my-2">
                    <button
                      onClick={decrementQty}
                      className="btn btn-outline-secondary"
                    >
                      -
                    </button>
                    <input
                      value={quantity}
                      type="text"
                      className="form-control bg-light text-center"
                      readOnly
                    />
                    <button
                      onClick={incrementQty}
                      className="btn btn-outline-secondary"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="col-4 p-2">
                  <button className="btn w-100 btn-success">Add to Cart</button>
                </div>
                <div className="col-4 p-2">
                  <button className="btn w-100 btn-success">Add to Wish</button>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="Special-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#Special-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="Special-tab-pane"
                  aria-selected="true"
                >
                  Specifications
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="Review-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#Review-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="Review-tab-pane"
                  aria-selected="false"
                >
                  Review
                </button>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="Special-tab-pane"
                role="tabpanel"
                aria-labelled-by="Special-tab"
                tabIndex="0"
              >
                {parse(productDetails[0]["details"]["description"])}
              </div>
              <div
                className="tab-pane fade"
                id="Review-tab-pane"
                role="tabpanel"
                aria-labelledby="Review-tab"
                tabIndex="0"
              >
                <ReviewComponent />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Details;
