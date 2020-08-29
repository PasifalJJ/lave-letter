import Vue from 'vue'
import axios from 'axios'
import config from './config'

axios.defaults.baseURL = config.api;
axios.defaults.timeout = 2000;

// axios请求拦截器
axios.interceptors.request.use(function (config) {
    // console.log(config);
  
    // 在header中添加token
    const token = localStorage.getItem("token");
    if (token) {
      config.headers['tokens'] = token;
    }
    return config;
  },error => {
    return Promise.reject(error);
  });

Vue.prototype.$http = axios;
