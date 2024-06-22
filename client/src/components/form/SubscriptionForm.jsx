import React from "react";

const SubscriptionForm = () => {
  return (
    <div>
      <form className="row g-3 needs-validation" novalidate>
        <div className="col-12">
          <label className="form-label">Enter e-mail to subscribe</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter e-mail"
            required
          />
        </div>

        <div className="col-12">
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubscriptionForm;
