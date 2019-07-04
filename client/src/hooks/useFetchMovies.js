import { useEffect, useState } from 'react';

const useFetchMovies = () => {
    const [data, setData] = useState({ hits: [] });
    const [url, setUrl] = useState(
        'http://localhost:3000/movies',
    );
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);

            try {
                const result = await fetch("http://localhost:3000/movies",
                    {
                        method: "GET",
                        headers: {
                            'Content-type': 'applications/json'
                        }
                    }
                );

                let data = await result.json();
                setData(data);
            } catch (error) {
                setIsError(true);
            }

            setIsLoading(false);
        };

        fetchData();
    }, [url]);

    return [{ data, isLoading, isError }, setUrl];
};

export default useFetchMovies;