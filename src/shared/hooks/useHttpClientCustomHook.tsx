import { useState, useCallback } from "react";

const useHttpClientCustomHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);

      let responseData;
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
        });

        responseData = await response.json();

        //reponse.ok=false if 400/500 statuscode
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
        throw error;
      }
      return responseData;
    },
    []
  );
  // will return this so the componenets that use the hook can clear the error.
  const clearError = () => {
    setError(null);
  };

  return { error, isLoading, sendRequest, clearError };
};

export default useHttpClientCustomHook;
