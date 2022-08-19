import { useState, useEffect } from 'react';

const useAxiosFunction = () => {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [controller, setController] = useState();

  const axiosFetch = async (config) => {
    const {
      axiosInstance,
      method,
      url,
      requestConfig = {},
    } = config;

    try {
      setLoading(true);

      const fetchController = new AbortController();
      setController(fetchController);

      const result = await axiosInstance[method.toLowerCase()](
        url,
        {
          ...requestConfig,
          signal: fetchController.signal,
        },
      );
      console.log('axios get result', result);
      setResponse(result.data);
    } catch (fetchError) {
      // console.log(fetchError.message);
      setError(fetchError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => (
    () => controller && controller.abort()
  ), [controller]); // use effect on component mount and when reload changes

  return [response, error, loading, axiosFetch];
};

export default useAxiosFunction;
