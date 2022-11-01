import { React } from "react";
import "./index.scss";

const Register = () => {
  return (
    <>
      <div className="registerContainer">
        <div className="register">
          <div className="r-title">
            <h2>Register</h2>
            <div className="r-tips">Already have account?Login</div>
          </div>
          <div className="r-formWrap">
            <div className="r-formLabel">Username *</div>
            <input placeholder="4-20 Character" className="r-formItem" />
          </div>
          <div className="r-formWrap">
            <div className="r-formLabel">Password *</div>
            <input
              placeholder="6-20 character, includes number,letter and special characters"
              className="r-formItem"
            />
          </div>
          <div className="r-formWrap">
            <div className="r-formLabel">Confirm Password *</div>
            <input placeholder="Re-input password" className="r-formItem" />
          </div>
          <div className="r-formWrap">
            <div className="r-formLabel">Email</div>
            <input
              placeholder="Get your password when you forgot"
              className="r-formItem"
            />
          </div>
          <input className="register-info" type="checkbox" />
          &nbsp;&nbsp; Website Policy
          <button className="register-btn">Agree policy and register</button>
        </div>
      </div>
    </>
  );
};

export default Register;
