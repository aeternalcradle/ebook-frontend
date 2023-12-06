import React from 'react';

import './App.css';

import {useRoutes} from "react-router-dom"
import router from "./router";

function BeforeRouterEnter(){
    /*对于后台管理系统的两种经典跳转情况
    1.如果访问的是登录界面，有token，跳转到首页
    2.访问的是系统内部的页面并且没有token，跳转到登录页
    3.其余的都放行
    * */

    return  useRoutes(router)
}

function App() {

    return (
    <div className="App">

        <BeforeRouterEnter/>
    </div>
  );
}

export default App;
