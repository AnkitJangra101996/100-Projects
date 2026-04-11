import { useState } from "react";

export const useFetch = (query, ...args) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async (value) => {
    console.log(func);
    setLoading(true);
    try {
      const res = await fetch(value, ...args);
      const resData = await res.json();
      setData(resData?.data);
    } catch (error) {
      setError(error?.message);
      //   throw new Error();
    } finally {
      setLoading(false);
    }
  };

  return { fetchData, loading, error, data };
};
