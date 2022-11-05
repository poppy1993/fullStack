import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./index.scss";
import { Breadcrumb as Bread } from "antd";

const Breadcrumb = () => {
  const {
    state: { item, detail },
  } = useLocation();

  return (
    <div className="breadcrumb">
      <span>Location:</span>
      <Bread separator=">">
        <Bread.Item>
          <Link to="/">Start</Link>
        </Bread.Item>
        {detail ? (
          <Bread.Item>
            <Link
              to={{
                pathname: "/item",
                state: { item },
              }}
            >
              {item}
            </Link>
          </Bread.Item>
        ) : (
          <Bread.Item>{item}</Bread.Item>
        )}
        {detail ? <Bread.Item>{detail}</Bread.Item> : null}
      </Bread>
    </div>
  );
};

export default Breadcrumb;
