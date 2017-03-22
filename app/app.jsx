/*
 * @file app main file
 */
//  转换es2015新的API
import 'babel-polyfill';
import 'bootstrap/scss/bootstrap.scss';
import { Router, Route, Link } from 'react-router';

import React from 'react';
// ReactDOM 是一個 JS 的函式庫，這裡面包含很多 React 才能用的功能，而裡面幾乎都是處理 DOM 的功能。
import ReactDOM from 'react-dom';
import Deskmark from 'components/Deskmark';

const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<Deskmark />, app);
