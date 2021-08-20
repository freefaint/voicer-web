// React
import axios, { AxiosResponse } from 'axios';

const ORIGIN = typeof document !== "undefined" ? document.location && document.location.origin : 'https://freefaint.ru';
const API_PATH = 'api';
const VERSION = 'v1';
const BASE_URL = `${ORIGIN}/${API_PATH}/${VERSION}`;

const getConfig = () => {
  const headers = {
    // Accept: 'application/json',
    // 'Content-Type': 'application/json',
  };

  return {
    baseURL: BASE_URL,

    headers,
  };
};

const responseHandler = (resp: AxiosResponse) => {
  return resp.data;
};

/** HTTP GET */
export function get(url: string, config?: {}) {
  return axios.get(url, { ...getConfig(), ...config }).then(responseHandler);
}

/** HTTP PUT */
export function put(url: string, data: object = {}, config?: {}) {
  return axios.put(url, data, { ...getConfig(), ...config }).then(responseHandler);
}

/** HTTP POST */
export function post(url: string, data: object = {}, config?: {}) {
  return axios.post(url, data, { ...getConfig(), ...config }).then(responseHandler);
}

/** HTTP PATCH */
export function patch(url: string, data: object = {}, config?: {}) {
  return axios.patch(url, data, { ...getConfig(), ...config }).then(responseHandler);
}

/** HTTP DELETE */
export function del(url: string, config?: {}) {
  return axios.delete(url, { ...getConfig(), ...config }).then(responseHandler);
}

export function upload(url: string, file: File, onProgress?: (percent: number) => void, compress?: boolean) {
  const form = new FormData();

  form.append('file', file);

  if (compress) {
    form.append('compress', 'true');
  }

  return axios
    .post(url, form, {
      ...getConfig(),

      baseURL: BASE_URL,
      withCredentials: true,

      onUploadProgress: e => {
        if (e.lengthComputable && onProgress) {
          onProgress(Math.ceil((e.loaded / e.total) * 100));
        }
      },
    })
    .then(resp => resp.data);
}
