import React from 'react';
import './index.scss';

const Main = () => {
  return (
    <div className='main-container'>
      <div className='left-container'>
        <div className='navbar'>
          <div className='icon'>
          </div>
          <div className='text'>Home</div>
        </div>
        <div className='navbar'>
          <div className='icon'>
          </div>
          <div className='text'>My Items</div>
        </div>
        <div className='navbar'>
          <div className='icon'>
          </div>
          <div className='text'>Account Setting</div>
        </div>
        <div className='navbar'>
          <div className='icon'>
          </div>
          <div className='text'>Message</div>
        </div>
        <div className='navbar'>
          <div className='icon'>
          </div>
          <div className='text'>Data</div>
        </div>
      </div>
      <div className='right-container'>
      </div>
    </div>
  )
}

export default Main;