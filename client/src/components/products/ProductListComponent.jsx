import React, { useState } from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import ProductStore from "../../store/ProductStore";
import ProductSkeleton from "../../skeleton/ProductSkeleton";
import { useEffect } from "react";

const ProductListComponent = () => {
  const {
    ProductList,
    brandList,
    getBrandList,
    categoryList,
    getCategoryList,
    getProductListByFilter
  } = ProductStore();

  const [filter, setFilter]=useState({
    brandId:"",
    categoryId:"",
    priceMax:"",
    priceMin:""
  });

  const inputOnChange=async(name, value)=>{
    setFilter((data)=>(
      {
        ...data,
        [name]:value
      }
    ))
  }

  useEffect(() => {
    (async () => {
      brandList === null ? await getBrandList() : null;
      categoryList === null ? await getCategoryList() : null;

      const isFilterEmpty = Object.values(filter).every(value => value==="");
      !isFilterEmpty ? await getProductListByFilter(filter) : null;

    })();
  }, [filter]);

  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col-md-3 p-2">
          <div className="card vh-100 p-3 shadow-sm">
            <label className="form-label mt-3">Brands</label>
            <select value={filter.brandId} onChange={async(e)=>{await inputOnChange('brandId', e.target.value)}}  className="form-control form-select">
              <option value="">Choose Brand</option>
              {brandList !== null ? (
                brandList.map((item, i) => {
                  return (
                    <option value={item["_id"]}>{item["brandName"]}</option>
                  );
                })
              ) : (
                <option></option>
              )}
            </select>
            <label className="form-label mt-3">Categories</label>
            <select value={filter.categoryId} onChange={async(e)=>{await inputOnChange('categoryId', e.target.value)}} className="form-control form-select">
              <option value="">Choose Category</option>
              {categoryList !== null ? (
                categoryList.map((item, i) => {
                  return (
                    <option value={item["_id"]}>{item["categoryName"]}</option>
                  );
                })
              ) : (
                <option></option>
              )}
            </select>
            <label className="form-label mt-3">Maximum Price ${filter.priceMax}</label>
            <input
             value={filter.priceMax} onChange={async(e)=>{await inputOnChange('priceMax', e.target.value)}} 
              min={0}
              max={100000}
              step={1000}
              type="range"
              className="form-range"
            />

            <label className="form-label mt-3"> Minimum Price ${filter.priceMin} </label>
            <input
             value={filter.priceMin} onChange={async(e)=>{await inputOnChange('priceMin', e.target.value)}} 
              min={0}
              max={100000}
              step={1000}
              type="range"
              className="form-range"
            />
          </div>
        </div>
        <div className="col-md-9 p-2">
          <div className="container">
            <div className="row">
              {ProductList === null ? (
                <ProductSkeleton />
              ) : (
                <div className="container">
                  <div className="row">
                    {ProductList.map((item, i) => {
                      let price = (
                        <p className="bodyMedium text-dark my-1">
                          {" "}
                          Price: {item["price"]} BDT
                        </p>
                      );
                      if (item["discount"] === true) {
                        price = (
                          <p className="bodyMedium text-dark my-1">
                            Price: <strike> {item["price"]} BDT</strike>{" "}
                            {item["discountPrice"]} BDT
                          </p>
                        );
                      }
                      return (
                        <div className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">
                          <Link
                            to={`/details/${item["_id"]}`}
                            className="card shadow-sm h-100 rounded-3 bg-white"
                          >
                            <img
                              className="w-100 rounded-top-2"
                              src={item["image"]}
                            />
                            <div className="card-body">
                              <p className="bodySmal text-secondary my-1">
                                {" "}
                                {item["title"]}{" "}
                              </p>
                              {price}
                              <StarRatings
                                rating={parseFloat(item["star"])}
                                starRatedColor="red"
                                starDimension="15px"
                                starSpacing="2px"
                              />
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListComponent;
