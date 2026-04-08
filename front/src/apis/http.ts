import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { errorReport } from '@/utils/tools';

// 接口调用成功
const successFn = (response: AxiosResponse<any>, resolve: (value: any) => void, params: any) => {
  const { data, config } = response;
  let statusKey = 'status_code';
  // 本项目部分老接口的状态码字段不统一，找出额外状态码避免不必要的异常上报
  const statusKeyList = ['errorcode', 'errorCode', 'code'];
  for (const key of statusKeyList) {
    if (Object.keys(data).includes(key)) {
      statusKey = key;
      break;
    }
  }
  if (data[statusKey] !== 0) {
    errorReport({
      name: '接口数据异常报错',
      message: `url:${config?.url},code:${data[statusKey]},params:${JSON.stringify(params)}`,
      stack: `接口返回为${JSON.stringify(data)}`
    });
  }
  resolve(data);
};

// 接口调用失败处理
const failFn = (error: Error, reject: (reason?: any) => void, params: any, url: string) => {
  errorReport({
    name: '接口调用报错',
    message: `url:${url},params:${JSON.stringify(params)},message:${error.message}`,
    stack: error.stack
  });
  reject(error);
};

// 创建 axios 实例
const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  timeout: 15000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器
instance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

class Request {
  /**
   * GET封装
   * @param {string} url 请求地址
   * @param {object} params 请求配置
   * @returns {Promise}
   */
  get(url: string, params: any, config?: AxiosRequestConfig | undefined): Promise<any> {
    return new Promise((resolve, reject) => {
      instance
        .get(url, { params, ...config })
        .then((response: AxiosResponse<any>) => {
          successFn(response, resolve, params);
        })
        .catch((error: Error) => {
          failFn(error, reject, params, url);
        });
    });
  }

}
const request: Request = new Request();

export default request;
