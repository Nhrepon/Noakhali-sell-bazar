import React from "react";
import SubscriptionForm from "../form/SubscriptionForm";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="container-fluid section-bottom">
        <div className="container py-5">
          <div className="row">
            <div className="col-md-3">
              <h1 className="bodyMedium">About</h1>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum{" "}
              </p>
              <img
                className="w-100"
                src="https://ecom.teamrabbil.com/assets/pay-ihRbdJoq.png"
              />
            </div>
            <div className="col-md-3">
              <h1 className="bodyMedium">Legals</h1>
              <p className="my-2">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </p>
              <p className="my-2">
                <Link className="nav-link" to="/refund">
                  Refund Policy
                </Link>
              </p>
              <p className="my-2">
                <Link className="nav-link" to="/terms">
                  Terms
                </Link>
              </p>
            </div>
            <div className="col-md-3">
              <h1 className="bodyMedium">Information</h1>
              <p className="my-2">
                <Link className="nav-link" to="/how-to-buy">
                  How to buy
                </Link>
              </p>
              <p className="my-2">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </p>
              <p className="my-2">
                <Link className="nav-link" to="/complain">
                  Complain
                </Link>
              </p>
            </div>
            <div className="col-md-3">
              <SubscriptionForm />
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid bg-success mt-5">
        <div className="container">
          <div className="row">
            <div className="col-12 text-light text-center py-5">
              Copyright@NoakhaliSellBazar 2024
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
