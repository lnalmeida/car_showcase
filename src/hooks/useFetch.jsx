import { useState, useCallback } from "react";
import { toast } from "sonner";

const useFetch = (cb) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fn = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);

      try {
        const response = await cb(...args);
        setData(response);
        return response;
      } catch (err) {
        setError(err);
        toast.error(err.message || "Erro desconhecido");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [cb]
  );

  return {
    data,
    loading,
    error,
    fn,
    setData,
  };
};

export default useFetch;
