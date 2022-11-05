import { React } from "react";
import Breadcrumb from "../../component/Breadcrumb";
import "./index.scss";
import {
  InputNumber,
  Tabs,
  Comment,
  Avatar,
  Input,
  List,
  Form,
  Button,
} from "antd";

const { TextArea } = Input;

const DetailCard = () => {
  return (
    <div className="detailCard">
      <div className="left"></div>
      <div className="right">
        <h2>Audi Q3 2022</h2>
        <div className="price">
          <span className="label">Price</span>
          <strong>$59999</strong>
        </div>
        <div className="category">
          <span className="label">Category</span>
          <span className="text">Car</span>
        </div>
        <div className="category">
          <span className="label">Type</span>
          <span className="text">Car</span>
        </div>

        <div className="quantities">
          <span className="label">Quantities</span>
          <span className="text">
            <InputNumber addonBefore="+" addonAfter="-" defaultValue={100} />
          </span>
        </div>
      </div>
    </div>
  );
};

const DescriptionRight = () => {
  const commentList = [
    {
      author: "Han Solo",
      thumbnail: "https://joeschmoe.io/api/v1/random",
      comment:
        "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
      time: "2016-11-22 11:22:33",
    },
    {
      author: "Han Solo",
      thumbnail: "https://joeschmoe.io/api/v1/random",
      comment:
        "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
      time: "2016-11-22 11:22:33",
    },
    {
      author: "Han Solo",
      thumbnail: "https://joeschmoe.io/api/v1/random",
      comment:
        "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
      time: "2016-11-22 11:22:33",
    },
  ];

  const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={submitting}
          onClick={onSubmit}
          type="primary"
        >
          Add Comment
        </Button>
      </Form.Item>
    </>
  );

  const items = [
    {
      label: `Item Details`,
      key: "detail",
      children: (
        <div className="descDetail">
          <div>Engine, Transmission, and Performance</div>
          <div>The Civic offers two four-cylinder engines, both excellent.</div>
          <div>
            Andy you can't go wrong with either of the two avaiable transmission
          </div>
        </div>
      ),
    },
    {
      label: `Comment`,
      key: "comment",
      children: (
        <>
          <Editor />
          <List
            itemLayout="horizontal"
            dataSource={commentList}
            renderItem={(item) => (
              <List.Item>
                <Comment
                  author={item.author}
                  avatar={<Avatar src={item.thumbnail} alt={item.author} />}
                  content={<p>{item.comment}</p>}
                  datetime={<span>{item.time}</span>}
                />
              </List.Item>
            )}
          />
        </>
      ),
    },
  ];

  return (
    <div className="descRight">
      <Tabs type="card" items={items}></Tabs>
    </div>
  );
};
const Description = () => {
  return (
    <div className="detailCard">
      <div className="descLeft">
        <div className="descLeftTitle">Herry Store</div>

        <div className="descLeftContent">
          <div className="descLeftItem">
            <div className="item">
              <div className="rateTitle">Items</div>
              <div className="rateValue">1</div>
            </div>
            <div className="service">
              <div className="rateTitle">Service</div>
              <div className="rateValue">5.0</div>
            </div>
            <div className="rate">
              <div className="rateTitle">Rate</div>
              <div className="rateValue">5.0</div>
            </div>
          </div>
          <div className="descBtnWrap">
            <div className="visit">Visit</div>
            <div className="like">Favorite</div>
          </div>
        </div>
      </div>
      <DescriptionRight />
    </div>
  );
};

const Detail = () => {
  return (
    <div className="detailPage">
      <Breadcrumb />
      <DetailCard />
      <Description />
    </div>
  );
};

export default Detail;
