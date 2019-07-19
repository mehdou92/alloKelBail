import { useEffect, useState } from 'react';

const useFetchComments = (link, toSend) => {
    const [data, setData] = useState({ hits: [] });
    // const [url, setUrl] = useState(
    //     'http://localhost:3000/movies',
    // );
    const [url, setUrl] = useState(link);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);

            try {
                const result = await fetch(url,
                    {
                        method: "POST",
                        headers: {
                            'Content-type': 'applications/json'
                        },
                        body: toSend,
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

export default useFetchComments;