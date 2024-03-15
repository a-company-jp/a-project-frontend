import axios from "axios";

const useApiClient = () => {
  interface BackendResponse {
    data: any;
    unauthorized: boolean;
    error: any;
  }

  const get = async (
    url: string,
    params?: Record<string, any>,
  ): Promise<BackendResponse> => {
    return await axios
      .get(process.env.NEXT_PUBLIC_BACKEND_DOMAIN + url, { params })
      .then((resp) => {
        if (resp.status < 210) {
          return { data: resp.data, unauthorized: false, error: null };
        }
        if (resp.status === 401) {
          return { data: null, unauthorized: true, error: resp.status };
        }
        return { data: null, unauthorized: false, error: resp.statusText };
      });
  };

  const put = async (url: string, body: any): Promise<BackendResponse> => {
    return await axios
      .put(process.env.NEXT_PUBLIC_BACKEND_DOMAIN + url, body)
      .then((resp) => {
        if (resp.status < 210) {
          return { data: resp.data, unauthorized: false, error: null };
        }
        if (resp.status === 401) {
          return { data: null, unauthorized: true, error: resp.status };
        }
        return { data: null, unauthorized: false, error: resp.statusText };
      });
  };

  const post = async (url: string, body: any): Promise<BackendResponse> => {
    return await axios
      .post(process.env.NEXT_PUBLIC_BACKEND_DOMAIN + url, body)
      .then((resp) => {
        if (resp.status < 210) {
          return { data: resp.data, unauthorized: false, error: null };
        }
        if (resp.status === 401) {
          return { data: null, unauthorized: true, error: resp.status };
        }
        return { data: null, unauthorized: false, error: resp.statusText };
      });
  };
  return { get, put, post };
};

export default useApiClient;
