import React from "react";
import { Link } from "react-router-dom";
import SliderSkeleton from "../../skeleton/SliderSkeleton";
import ProductStore from "../../store/ProductStore";

const SliderComponent = () => {
  const { sliderList } = ProductStore();
  if (sliderList == null) {
    return <SliderSkeleton />;
  } else {
    return (
      <div className="container-fluid hero-bg">
        <div
          id="carouselExampleDark"
          className="carousel carousel-dark slide "
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            {sliderList.map((item, i) => {
              return (
                <button
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide-to={i}
                  className="active"
                  aria-current="true"
                ></button>
              );
            })}
          </div>

          <div className="carousel-inner py-5">
            {sliderList.map((item, i) => {
              let active = "carousel-item";
              if (i === 0) {
                active = "carousel-item active";
              }
              return (
                <div key={i} className={active} data-bs-interval="3000">
                  <div className="container">
                    <div className="row justify-content-center">
                      <div className="col-12 col-lg-5 col-sm-12 col-md-5 p-5">
                        <h1 className="headline-1">{item["title"]}</h1>
                        <p>{item["des"]}</p>
                        <Link to={"/details/"+item["productId"]} className="btn text-white btn-success px-3">
                          Buy Now
                        </Link>
                      </div>
                      <div className="col-12 col-lg-5 col-sm-12 col-md-5 p-5">
                        <img src={item["image"]} className="w-100" alt={item["title"]} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            className="carousel-control-prev btn rounded-5"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>

          <button
            className="carousel-control-next btn"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    );
  }
};

export default SliderComponent;
