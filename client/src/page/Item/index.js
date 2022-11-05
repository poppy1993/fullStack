import React, { useState } from "react";
import "./index.scss";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import Breadcrumb from "../../component/Breadcrumb";
import { List, Card, Pagination, InputNumber } from "antd";
import Meta from "antd/lib/card/Meta";

const ItemHeader = () => {
  const showTotal = (total) => `Total ${total} items`;
  const order = "up";
  return (
    <div className="itemHeader">
      <div className="itemHeaderLeft">
        <div className="categoryLabel">Default</div>
        <div>
          <span>
            Price {order === "up" ? <CaretUpOutlined /> : <CaretDownOutlined />}
          </span>
          <span>
            Rate&nbsp;&nbsp;
            <InputNumber min={1} max={100000} defaultValue={3} />
            &nbsp;&nbsp;--&nbsp;&nbsp;
            <InputNumber min={1} max={100000} defaultValue={3} />
            &nbsp;&nbsp;$
          </span>
        </div>
      </div>

      <Pagination
        className="pagination"
        size="small"
        total={50}
        showTotal={showTotal}
        showSizeChanger
        showQuickJumper
        pageSizeOptions={["20", "40", "80"]}
      />
    </div>
  );
};
const Category = () => {
  const [activeKey, setActiveKey] = useState("Phone");
  const data = [
    { id: 1, name: "category", items: ["All", "Phone", "Bag"] },
    { id: 2, name: "brand", items: ["All", "Chanel", "LV"] },
    { id: 3, name: "model", items: ["All", "Iphone", "Galaxy", "Huawei"] },
  ];

  return (
    <div>
      <List
        className="category"
        size="small"
        bordered
        dataSource={data}
        renderItem={({ name, items, id }) => (
          <List.Item className="categoryRow" key={id}>
            <div className="categoryLabel">{name}:</div>
            <div className="categoryItem">
              {items.map((i) => (
                <div
                  className={`categoryCell ${i === activeKey ? "active" : ""}`}
                  onClick={() => setActiveKey(i)}
                >
                  {i}
                </div>
              ))}
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

const Item = () => {
  const data = [
    { name: "iphone", old: "$999", now: "599" },
    { name: "iphone", old: "$999", now: "399" },
    { name: "iphone", old: "$999", now: "199" },
    { name: "iphone", old: "$999", now: "299" },
    { name: "iphone", old: "$999", now: "299" },
    { name: "iphone", old: "$999", now: "299" },
  ];

  const goDetail = () => {};

  return (
    <div>
      <List
        className="item"
        size="small"
        header={<ItemHeader />}
        bordered
        dataSource={data}
        renderItem={({ name, old, now }) => (
          <List.Item className="itemCell">
            <Card
              hoverable
              style={{ width: 210 }}
              cover={
                <div style={{ width: 210, height: 220, background: "#ccc" }} />
                // <img
                //   alt="example"
                //   src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                //   onClick={goDetail}
                // />
              }
            >
              <Meta
                title={name}
                description={
                  <>
                    <span style={{ marginRight: "12px", color: "#f76c10" }}>
                      {now}
                    </span>
                    <span>{old}</span>
                  </>
                }
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};
const Items = () => {
  return (
    <div className="itemPage">
      <Breadcrumb />
      <Category />
      <Item />
    </div>
  );
};

export default Items;
