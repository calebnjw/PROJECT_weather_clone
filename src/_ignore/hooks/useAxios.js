import { useState, useEffect } from 'react';

const useAxios = (config) => {
  const {
    axiosInstance,
    method,
    url,
    requestConfig = {},
  } = config;

  const [response, setResponse] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(true);

  // function to change value of reload, so that useEffect will run again,
  // and refresh data on page
  const refresh = () => setReload(!reload);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const result = await axiosInstance[method.toLowerCase()](
          url,
          {
            ...requestConfig,
            signal: controller.signal,
          },
        );
        console.log(result);
        setResponse(result.data);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [reload]); // use effect on component mount and when reload changes

  return [response, error, loading, refresh];
};

export default useAxios;
