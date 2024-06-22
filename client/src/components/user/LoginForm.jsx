import React from "react";
import UserSubmitButton from "./UserSubmitButton";
import UserStore from "../../store/UserStore";
import ValidationHelper from "../../utility/ValidationHelper";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const { loginFormValue, loginFormOnChange, userOtp } = UserStore();

  const onFormSubmit = async () => {
    
    if (!ValidationHelper.IsEmail(loginFormValue.email)) {
      toast.error("Valid Email Required");
    } else {
      const response = await userOtp(loginFormValue.email);
      response ? navigate("/otp") : toast.error("Email Not Found");
    }
  };
  return (
    <div className="container section">
      <div className="row d-flex justify-content-center">
        <div className="col-md-5">
          <div className="card p-5">
            <h4>Enter Your Email</h4>
            <p>
              A verification code will be sent to the email address you provide
            </p>
            <input
              value={loginFormValue.email}
              onChange={(e) => {
                loginFormOnChange("email", e.target.value);
              }}
              placeholder="Email Address"
              type="email"
              className="form-control"
            />
            <UserSubmitButton
              onClick={onFormSubmit}
              submit={true}
              className="btn mt-3 btn-success"
              text="Next"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
