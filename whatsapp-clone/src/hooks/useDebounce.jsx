import { useRef, useState } from "react";

export const useDebounce = (func, wait) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const controllerRef = useRef(null);
  const timeoutRef = useRef(null);

  const run = (value) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      const controller = new AbortController();
      controllerRef.current = controller;

      setLoading(true);
      setError(null);

      func(value, controller.signal)
        .then((res) => {
          !value ? setData([]) : setData(res.data);
        })
        .catch((err) => {
          if (err.name !== "AbortError") {
            setError(err);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }, wait);
  };

  return { run, loading, error, data };
};
