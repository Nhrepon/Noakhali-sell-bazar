import React from "react";
import ProductStore from "../../store/ProductStore";
import StarRatings from "react-star-ratings";

const ReviewComponent = () => {
  const { productReviewList } = ProductStore();

  return (
    <div>
      <ul className="list-group list-group-flush">
        {productReviewList !== null &&
          productReviewList.map((item, i) => {
            return (
              <li className="list-group-item bg-transparent my-3" key={i}>
                <h6> <i class="bi bi-person"></i> {item["profile"]["userName"]}</h6>
                <p className="p-0 m-0">{item["description"]}</p>
                <StarRatings rating={parseFloat(item["rating"])} starRatedColor="red" starDimension="15px" starSpacing="2px"  />
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default ReviewComponent;
