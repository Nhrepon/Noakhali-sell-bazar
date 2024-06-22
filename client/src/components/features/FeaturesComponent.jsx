import React from "react";
import FeatureStore from "../../store/FeatureStore";
import FeatureSkeleton from "../../skeleton/FeatureSkeleton";

const FeaturesComponent = () => {

  const { featureList } = FeatureStore();

  if (featureList === null) {
    return <FeatureSkeleton />;
  } else {
    return (
      <div className="container">
        <div className="row">
        <h1 className="headline-4 text-center my-2 p-0">Top Brands</h1>
            <span className="bodySmal mb-5 text-center">
              Explore a World of Choices Across Our Most Popular <br />
              Shopping Categories{" "}
            </span>
          {
          featureList.map((item, index) => {
            return(
                <div key={index} className="col-6 p-2 col-md-3 col-lg-3 col-sm-6">
              <div className="card shadow-sm">
                <div className="card-body">
                  <div className="row">
                    <div className="col-3">
                      <img className="w-100" src={item['img']} />
                    </div>
                    <div className="col-9">
                      <h3 className="bodyXLarge">{item['name']}</h3>
                      <span className="bodySmal">{item['description']}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            );
          })
          }
        </div>
      </div>
    );
  }
};

export default FeaturesComponent;
