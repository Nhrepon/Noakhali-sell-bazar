import React, { useEffect } from 'react';
import WishStore from '../../store/WishStore';
import LoaderComponent from '../../loaders/LoaderComponent';
import StarRatings from "react-star-ratings";
import { Link } from 'react-router-dom';

const WishList = () => {

    const {wishList, getWishList, removeWishList}=WishStore();

    useEffect(() => {
        (async()=>{
            await getWishList();
        })()
    }, []);

    const removeWish=async(productId)=>{
        await removeWishList(productId);
        await getWishList();
    };


    if (wishList === null) {
        return (
            <div className="container">
                <div className="row">
                    <LoaderComponent/>
                </div>
            </div>
        );
    }else if (wishList.length === 0) {
        return (
            <div className="container">
                <div className="row text-center">
                    <div className="col-12  text-center my-5 p-5">
                    <h1 className="headline-1">Opps!</h1>
                    <h3 className="headline-3">Your Wish List is Empty</h3>
                    </div>
                </div>
            </div>
        )
        
    }else{
        return (
            <div className="container">
                  <div className="row">
                    {wishList.map((item, i) => {
                      let price = (
                        <p className="bodyMedium text-dark my-1">
                          {" "}
                          Price: {item["product"]["price"]} BDT
                        </p>
                      );
                      if (item["product"]["discount"] === true) {
                        price = (
                          <p className="bodyMedium text-dark my-1">
                            Price: <strike> {item["product"]["price"]} BDT</strike>{" "}
                            {item["product"]["discountPrice"]} BDT
                          </p>
                        );
                      }
                      return (
                        <div className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">
                            <div className="card shadow-sm h-100 rounded-3 bg-white">
                          <Link
                            to={`/details/${item["productId"]}`}
                          >
                            <img
                              className="w-100 rounded-top-2"
                              src={item["product"]["image"]}
                            />
                            </Link>
                            <div className="card-body">
                              <p className="bodySmal text-secondary my-1">
                                {item['product']["title"]}
                              </p>
                              {price}
                              <StarRatings
                                rating={parseFloat(item["product"]["star"])}
                                starRatedColor="red"
                                starDimension="15px"
                                starSpacing="2px"
                              />
                              <div className="mt-3">
                                <button onClick={async()=>{await removeWish(item["productId"])}} className="btn btn-outline-danger btn-sm">Remove</button>
                                <Link to={`/details/${item["productId"]}`} className="btn btn-outline-success btn-sm ms-2">View details</Link>
                              </div>
                            </div>
                            </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
        )
    }

};

export default WishList;