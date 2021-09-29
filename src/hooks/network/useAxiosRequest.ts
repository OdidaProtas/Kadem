import { useEffect, useState } from "react";
import refTryRefactor from "../../constants/refTryRefractor";
import { axiosInstance } from "../../state";

export interface UseAxiosRequestInterface {
  context: string;
  method: "post" | "patch" | "get" | "put" | "delete";
  endpoint: string;
  isAuthenticated: boolean;
  payload?: any;
  errorHandler: any;
  successHandler: any;
}

export default function useAxiosRequest() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  const processRequest = async (options: UseAxiosRequestInterface) => {
    setLoading(true);
    const { method, endpoint, payload, errorHandler, successHandler } = options;
    const promise = axiosInstance[method](endpoint, payload);
    const [res, err] = await refTryRefactor(promise);
    if (res) {
      setData(res.data);
      successHandler();
      setLoading(false);
    } else {
      setError(true);
      setLoading(false);
      errorHandler();
    }
  };
  useEffect(() => {
    return () => {
      setError(false);
      setData(null);
    };
  }, [loading, data, error]);
  return { processRequest, data, loading, error };
}
