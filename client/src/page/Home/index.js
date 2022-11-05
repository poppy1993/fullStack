import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  GroupOutlined,
  HomeOutlined,
  CarOutlined,
  MobileOutlined,
} from "@ant-design/icons";
import { Carousel } from "antd";
import "./index.scss";

const Menu = ({ activeKey, toggle }) => {
  const history = useHistory();

  const goItemPage = (category) => {
    toggle(category);
    history.push({
      pathname: "item",
      state: {
        item: category,
      },
    });
  };

  return (
    <div>
      <div className="header">Category</div>
      <div className="menu">
        <div
          className={`${
            activeKey === "furniture" ? "active menuItemWrap" : "menuItemWrap"
          }`}
          onClick={() => goItemPage("furniture")}
        >
          <div className="menuItem">
            <GroupOutlined className="menuIcon" />
            <span className="menuName">Furniture</span>
          </div>
        </div>
        <div
          className={`${
            activeKey === "electrics" ? "active menuItemWrap" : "menuItemWrap"
          }`}
          onClick={() => goItemPage("electrics")}
        >
          <div className="menuItem">
            <MobileOutlined className="menuIcon" />
            <span className="menuName">Electrics</span>
          </div>
        </div>
        <div
          className={`${
            activeKey === "vehicle" ? "active menuItemWrap" : "menuItemWrap"
          }`}
          onClick={() => goItemPage("vehicle")}
        >
          <div className="menuItem">
            <CarOutlined className="menuIcon" />
            <span className="menuName">Vehicle</span>
          </div>
        </div>
        <div
          className={`${
            activeKey === "clothing" ? "active menuItemWrap" : "menuItemWrap"
          }`}
          onClick={() => goItemPage("clothing")}
        >
          <div className="menuItem">
            <span className="menuName">Clothing</span>
          </div>
        </div>
        <div
          className={`${
            activeKey === "house" ? "active menuItemWrap" : "menuItemWrap"
          }`}
          onClick={() => goItemPage("house")}
        >
          <div className="menuItem">
            <HomeOutlined className="menuIcon" />
            <span className="menuName">House Rent</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Slider = ({ activeKey }) => {
  useEffect(() => {
    console.log("activeKey", activeKey);
    // TODO: 调用接口请求资源
  }, [activeKey]);

  return (
    <Carousel className="carousel" autoplay>
      <div>
        <h3 className="carouselItem">1</h3>
      </div>
      <div>
        <h3 className="carouselItem">2</h3>
      </div>
      <div>
        <h3 className="carouselItem">3</h3>
      </div>
      <div>
        <h3 className="carouselItem">4</h3>
      </div>
    </Carousel>
  );
};

const Category = () => {
  const [activeKey, setActiveKey] = useState("vehicle");

  return (
    <div className="category">
      <Menu activeKey={activeKey} toggle={setActiveKey} />
      <Slider activeKey={activeKey} />
    </div>
  );
};

const News = () => {
  return (
    <div className="news">
      <h2 className="newsTitle">Latest News</h2>
      <div className="newsText">
        <div className="text">
          Hery Wang just leave IphoneX inMohawHery Wang just leave IphoneX
          inMohawHery Wang just leave IphoneX inMohawk
        </div>
        <div className="info">
          Price:<span className="price">$500</span>
          [Five Minutes Later]
        </div>
      </div>
    </div>
  );
};

const ItemCard = (item) => {
  const history = useHistory();
  const { name, itemId, picUrl, price, itemName } = item;

  const goItem = () => {
    history.push({
      pathname: "/detail",
      state: {
        item: itemName,
        detail: name,
      },
    });
  };

  return (
    <div className="itemCard" onClick={goItem}>
      <div className="img"></div>
      <div className="itemInfo">
        <div className="name">{name}</div>
        <div className="price">{price}</div>
      </div>
    </div>
  );
};
const Items = () => {
  const [loading, setLoading] = useState(false);
  const [data, setState] = useState([
    {
      picUrl: "",
      name: "IphoneX",
      price: "500$",
      itemId: 1,
      itemName: "Phone",
    },
    {
      picUrl: "",
      name: "MacBook Pro",
      price: "500$",
      itemId: 1,
      itemName: "Electrics",
    },
    {
      picUrl: "",
      name: "Car MacBook Pro",
      price: "500$",
      itemId: 1,
      itemName: "Electrics",
    },
    {
      picUrl: "",
      name: "Sofa",
      price: "500$",
      itemId: 1,
      itemName: "Home Rent",
    },
    {
      picUrl: "",
      name: "MacBook Pro",
      price: "500$",
      itemId: 1,
      itemName: "Home Rent",
    },
  ]);
  useEffect(() => {
    // TODO:
  }, []);

  return (
    <div className="item">
      <h2 className="itemTitle">Popular Items</h2>
      <div className="itemWrap">
        {data.map((item) => (
          <ItemCard {...item} />
        ))}
      </div>
    </div>
  );
};

const Ads = () => {
  return <div className="ads">ads</div>;
};

const Home = () => {
  return (
    <div className="homePage">
      <Category />
      <div className="wrap">
        <div className="left">
          <News />
          <Items />
        </div>
        <Ads />
      </div>
    </div>
  );
};

export default Home;
