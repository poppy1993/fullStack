import { React } from "react";
import "./index.scss";

const ForgotPassword = () => {
  return (
    <>
      <div className="forgotContainer">
        <div className="forgot">
          <div className="f-title">
            <h2>Password Reset Through Email</h2>
            <div className="f-tips">Use other way</div>
          </div>
          <div className="f-formWrap">
            <div className="f-formLabel">Email *</div>
            <input placeholder="Enter your email" className="f-formItem" />
          </div>
          <div className="f-formWrap">
            <div className="f-formLabel">Password *</div>
            <input
              placeholder="6-20 character, includes number,letter and special characters"
              className="f-formItem"
            />
          </div>
          <div className="f-formWrap">
            <div className="f-formLabel">Confirm Password *</div>
            <input placeholder="Re-input password" className="f-formItem" />
          </div>

          <button className="f-btn">Save</button>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
