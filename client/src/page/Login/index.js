import { React } from "react";
import "./index.scss";

const Login = () => {
  return (
    <>
      <div className="container">
        <div className="loginWrap">
          <div className="login">
            <h2>Login</h2>

            <div className="name">
              <input className="formItem" placeholder="Email" />
            </div>
            <div className="pwd">
              <input className="formItem" placeholder="Password" />
            </div>

            <button className="loginBtn">Login</button>

            <div className="opeWrap">
              <div className="opeItem">Forgot Password</div>
              <div className="opeItem">Register</div>
            </div>

            <div className="opeWrap">
              <div className="opeItem"></div>
              <div className="opeItem">Browse as guest</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
