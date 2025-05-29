import { useEffect, useState } from "react";
import FetchDataFromApi from "../utils/FetchDataFromApi";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {                                    //useEffect is used to fetch data from api when the  changes or component mounts 
        setLoading(true);
        setData(null);
        setError(null);

        FetchDataFromApi(url)
        .then((res) => {
            setLoading(false);
            setData(res);
        })
        .catch((err) => {
            setLoading(false);
            setError("Something went wrong!");
        });
    }, [url]);

    return { data, loading, error };
};

export default useFetch;