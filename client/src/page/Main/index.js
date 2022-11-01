import React from 'react';
import { Collapse } from 'antd';
import './index.scss';
import BasicInfo from '../../component/BasicInfo';
import ReceivedMessage from '../../component/ReceivedMessage';
import SendMessage from '../../component/SendMessage';



const { Panel } = Collapse;

const Main = () => {
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
            <div className='item-option active'>
              Basic Info
            </div>
          </Panel>
          <Panel header={(
            <div className='navbar'>
              <div className='icon message-icon'>
              </div>
              <div className='text'>Message</div>
            </div>
          )} key="4">
            <div className='item-option'>
              Received Message
            </div>
            <div className='item-option active'>
              Send Message
            </div>
          </Panel>
          <Panel header={(
            <div className='navbar'>
              <div className='icon data-icon'>
              </div>
              <div className='text'>Data</div>
            </div>
          )} key="5">
            <div className='item-option'>
              List Items
            </div>
            <div className='item-option active'>
              Banner
            </div>
          </Panel>
        </Collapse>
      </div>
      <div className='right-container'>
        <BasicInfo />
        <ReceivedMessage />
        <SendMessage />
      </div>
    </div>
  )
}

export default Main;