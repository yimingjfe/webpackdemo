import style from './style.css'
import React from 'react';
// import { Pagination } from 'antd'
import ReactDOM from 'react-dom';

ReactDOM.render(
  <div>
    <div className={style.container}>
      <h1 className={style.content}>Hello, world!</h1>
    </div>
    {/* <Pagination defaultCurrent={1} total={50} /> */}
  </div>
 ,
  document.getElementById('root')
)