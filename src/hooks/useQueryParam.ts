import { useSearchParams, useNavigate } from "react-router-dom";

export const useQueryParam = () => {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const navigate = useNavigate();

    const getQueryParam = (key: string): string | null => {
        return searchParams.get(key);
    }

    const setQueryParam = (params: Record<string, string | null | number>) => {
        const newParam = new URLSearchParams(searchParams.toString());

        Object.entries(params).forEach(([key, value]) => {
            if (value === null){
                newParam.delete(key);
            } else {
                newParam.set(key, value.toString());
            }
            navigate(`${window.location.pathname}?${newParam.toString()}`, { replace: true });
        })
    }

    const deleteQuery = (key: string) => {
        const newParam = new URLSearchParams(searchParams.toString());
        newParam.delete(key);
        setSearchParams(newParam);
    }

    return{
        getQueryParam,
        setQueryParam,
        deleteQuery
    }
}