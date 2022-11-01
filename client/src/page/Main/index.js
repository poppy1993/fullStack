import React, { useState, useEffect } from 'react';
import { Collapse } from 'antd';
import './index.scss';
import BasicInfo from '../../component/BasicInfo';
import ReceivedMessage from '../../component/ReceivedMessage';
import SendMessage from '../../component/SendMessage';
import BannerList from '../../component/BannerList';

const { Panel } = Collapse;

const AccountConfig = [{
  tabKey: 'basicInfo',
  componentName: <BasicInfo />,
  title: 'Basic Info'
}];

const MessageConfig = [{
  tabKey: 'receivedMessage',
  componentName: <ReceivedMessage />,
  title: 'Received Message'
}, {
  tabKey: 'SendMessage',
  componentName: <SendMessage />,
  title: 'Send Message'
}];

const DataConfig = [{
  tabKey: 'listItems',
  componentName: <BannerList />,
  title: 'List Items'
}, {
  tabKey: 'banner',
  componentName: <BannerList />,
  title: 'Banner'
}];

const Main = () => {
  const [ShowComponent, setShowComponent] = useState(null);
  const [tabKey, setTabKey] = useState('');

  return (
    <div className='main-container'>
      <div className='left-container'>
        <Collapse defaultActiveKey={['1']} expandIcon={() => {
          return null;
        }}>
          <Panel header={(
            <div className='navbar'>
              <div className='icon home-icon'>
              </div>
              <div className='text'>Home</div>
            </div>
          )} key="1">
            <div className='item-option active'>
              Basic Info
            </div>
          </Panel>
          <Panel header={(
            <div className='navbar'>
              <div className='icon item-icon'>
              </div>
              <div className='text'>My Items</div>
            </div>
          )} key="2">
            <div className='item-option active'>
              Basic Info
            </div>
          </Panel>
          <Panel header={(
            <div className='navbar'>
              <div className='icon account-icon'>
              </div>
              <div className='text'>Account Setting</div>
            </div>
          )} key="3">
            {
              AccountConfig.map((item, index) => {
                const { tabKey: key, componentName, title } = item;
                return (
                  <div key={key} className={`item-option ${tabKey === key ? 'active' : ''}`} onClick={() => {
                    setTabKey(key);
                    setShowComponent(componentName);
                  }}>
                    {title}
                  </div>
                )
              })
            }
          </Panel>
          <Panel header={(
            <div className='navbar'>
              <div className='icon message-icon'>
              </div>
              <div className='text'>Message</div>
            </div>
          )} key="4">
            {
              MessageConfig.map((item, index) => {
                const { tabKey: key, componentName, title } = item;
                return (
                  <div key={key} className={`item-option ${tabKey === key ? 'active' : ''}`} onClick={() => {
                    setTabKey(key);
                    setShowComponent(componentName);
                  }}>
                    {title}
                  </div>
                )
              })
            }
          </Panel>
          <Panel header={(
            <div className='navbar'>
              <div className='icon data-icon'>
              </div>
              <div className='text'>Data</div>
            </div>
          )} key="5">
            {
              DataConfig.map((item, index) => {
                const { tabKey: key, componentName, title } = item;
                return (
                  <div key={key} className={`item-option ${tabKey === key ? 'active' : ''}`} onClick={() => {
                    setTabKey(key);
                    setShowComponent(componentName);
                  }}>
                    {title}
                  </div>
                )
              })
            }
          </Panel>
        </Collapse>
      </div>
      <div className='right-container'>
        {ShowComponent && ShowComponent}
        {/* <showComponent /> */}
        {/* <BasicInfo />
        <ReceivedMessage />
        <SendMessage />
        <BannerList /> */}
      </div>
    </div>
  )
}

export default Main;