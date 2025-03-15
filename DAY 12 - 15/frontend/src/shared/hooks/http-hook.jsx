import { useCallback, useEffect, useRef, useState } from "react";

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const activeHttpRequests = useRef(new Set());

    const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setIsLoading(true);
        const httpAbortCtrl = new AbortController();
        activeHttpRequests.current.add(httpAbortCtrl);

        try {
            const response = await fetch(url, {
                method,
                body,
                headers,
                signal: httpAbortCtrl.signal,
            });

            const responseData = await response.json();

            activeHttpRequests.current.delete(httpAbortCtrl);

            if (!response.ok) {
                throw new Error(responseData.message || "Request failed!");
            }

            setIsLoading(false);
            return responseData;
        } catch (error) {
            if (error.name === "AbortError") {
                console.log("Request aborted:", url);
            } else {
                setError(error.message);
            }
            setIsLoading(false);
            throw error;
        }
    }, []);

    const clearError = () => {
        setError(null);
    };

    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
            activeHttpRequests.current.clear();
        };
    }, []);

    return { isLoading, error, sendRequest, clearError };
};
