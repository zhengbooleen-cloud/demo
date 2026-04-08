const { VITE_APP_PREFIX_APIGATE } = import.meta.env;

// 请求前缀
export const prefix = {
  apigate: VITE_APP_PREFIX_APIGATE
};

export * from './market';
