import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [fetchedData, setFetchedData] = useState({
    data: [],
    isLoading: true,
    error: false,
  });

  const cancelTokenSource = axios.CancelToken.source();
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(url);
      const data = await response.data;
      if (data) {
        // console.log(data)
        setFetchedData({
          data: data.items ? data.items : data,
          isLoading: false,
          error: false,
        });
      }
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("fetching data aborted", err);
      } else {
        console.log("error occured", err);
      }
      setFetchedData({
        data: [],
        isLoading: false,
        error: true,
      });
    }
  }, [url]);

  useEffect(() => {
    fetchData();
    return () => cancelTokenSource.cancel();
  }, [url, fetchData]);

  const { data, isLoading, error } = fetchedData;
  return { data, isLoading, error };
};

export default useFetch;
