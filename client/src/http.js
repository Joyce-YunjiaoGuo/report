import axios from 'axios';
import { Loading, Message } from 'element-ui';
import router from './router';

let loading;
const startLoading = () => {
  loading = Loading.service({
    text: '...',
  });
};

const endLoading = () => {
  loading.close();
};

// 请求拦截
axios.interceptors.request.use((config) => {
  // loading动画
  startLoading();
  // 设置token
  if (localStorage.token) {
    config.headers.Authorization = localStorage.token;
  }
  if (localStorage.userId) {
    const data = config.data;
    config.data = {
      ...data,
      userId: localStorage.userId,
    };
  }
  config.timeout = 6000;
  return config;
}, err => Promise.reject(err));

// 响应拦截
axios.interceptors.response.use((response) => {
  console.log(response, 'res');
  // loading动画
  endLoading();
  return response;
}, (err) => {
  // loading动画
  console.log(err.response);
  console.log(err, 'err');
  endLoading();
  // token过期
  if (err.response.status === 401) {
    Message.error('登录过期，请重新登录');
    localStorage.removeItem('token');
    router.push('/login');
  }
  Message.error(err.response.data.msg);
  return Promise.reject(err);
});

export default axios;
