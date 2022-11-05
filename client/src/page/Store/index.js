import { React } from "react";
import "./index.scss";

const StoreInfo = () => {
  return (
    <div className="storeInfo">
      <div className="storeInfoTop">
        <div className="storeHeader">Henry Store</div>
        <div className="storeDetail">
          <p>
            <span>Username:&nbsp;</span>Herny
          </p>
          <p>
            <span>Number:&nbsp;</span>15921111111
          </p>
          <p>
            <span>Email:&nbsp;</span>shirley131_cheng@163.com
          </p>
          <p>
            <span>Facebook:&nbsp;</span>shirley
          </p>
        </div>
      </div>
    </div>
  );
};

const StoreItem = () => {
  const itemList = [
    {
      name: "Iphone X",
      price: "300.00",
    },
    {
      name: "Iphone X",
      price: "300.00",
    },
    {
      name: "Iphone X",
      price: "300.00",
    },
    {
      name: "Iphone X",
      price: "300.00",
    },
    {
      name: "Iphone X",
      price: "300.00",
    },
  ];
  return (
    <div className="storeMain">
      {itemList.map((i, idx) => (
        <div className="storeItem" key={idx}>
          <div className="storeItemImg"></div>
          <div className="storeItemInfo">
            <strong>{i.price}</strong>
            <div>{i.name}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
const Store = () => {
  return (
    <div className="storeContainer">
      <div className="storeNavWrap">
        <div className="storeNav">
          <div className="storeNavItem">Main</div>
        </div>
      </div>
      <div className="storePage">
        <StoreInfo />

        <StoreItem />
      </div>
    </div>
  );
};

export default Store;
