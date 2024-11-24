import { useState, useEffect, useCallback } from "react";

type FetchConfig = {
    method?: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
    url: string;
    body?: object;
    header?: object;
}

type FetchState<T> = {
    error: string | null;
    loading: boolean;
    data: T | null;
}

export function useFetch <T> ({ method, url, header, body }: FetchConfig):FetchState<T> {
    const [ data, setData ] = useState<T | null>(null);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);

        try{
            const response = await fetch(url);
            const responseData = await response.json();
            setData(responseData);
        }catch{
            setError("Something is wrong");
        }finally{
            setLoading(false)
        }
    },[url]);

    useEffect(() => {
        fetchData()
    },[fetchData]);

    return {
        data, loading, error  
    }
}