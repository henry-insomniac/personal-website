import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

// 创建 axios 实例
const service: AxiosInstance = axios.create({
  baseURL: "https://101.126.142.152:443/interface",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 这里可以添加 token 等认证信息
    return config;
  },
  (error: Error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;
    return res;
  },
  (error: Error) => {
    console.error("请求错误:", error);
    return Promise.reject(error);
  }
);

// 封装 GET 请求
export const get = <T>(
  url: string,
  params?: Record<string, unknown>
): Promise<T> => {
  return service.get(url, { params });
};

// 封装 POST 请求
export const post = <T>(
  url: string,
  data?: Record<string, unknown>
): Promise<T> => {
  return service.post(url, data);
};

export default service;
