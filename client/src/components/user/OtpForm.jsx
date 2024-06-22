import React from "react";
import UserSubmitButton from "./UserSubmitButton";
import UserStore from "../../store/UserStore";
import { useNavigate } from "react-router";
import ValidationHelper from "../../utility/ValidationHelper";
import { toast } from "react-hot-toast";

const OtpForm = () => {
  const navigate = useNavigate();
  const {otpFormData, otpFormOnChange, verifyLogin}=UserStore();
  const onFormSubmit = async () => {
    
    if (ValidationHelper.IsEmpty(otpFormData.otp)) {
      toast.error("Valid otp Required");
    } else {
      const response = await verifyLogin(otpFormData.otp);
      response ? navigate("/profile") : toast.error("Otp Not Found");
    }
  };

  return (
    <div className="container section">
      <div className="row d-flex justify-content-center">
        <div className="col-md-5">
          <div className="card p-5">
            <h4>Enter Verification Code</h4>
            <p>
              A verification code has been sent to the email address you provide
            </p>
            <input value={otpFormData.otp} onChange={(e)=>{otpFormOnChange("otp",e.target.value)}}
              placeholder="Verification"
              type="text"
              className="form-control"
            />
            <UserSubmitButton
            onClick={onFormSubmit}
              submit={false}
              className="btn mt-3 btn-success"
              text="Submit"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpForm;
