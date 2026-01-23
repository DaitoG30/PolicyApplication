
import {useEffect, useState} from "react";

function DocumentViewer() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/policy/');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
                setError(null);
            } catch (error) {
                setError(error.message);
                setData(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []); // The empty array ensures this effect runs only once, on mount

    if (isLoading) {
        return <p>Loading data...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }
    console.log(data)
    return (
        <div>

            {data["Policies"].map(data => (
                <div key={data.id}>
                    <p>{data.link}</p>
                </div>
            ))}


        </div>
    )

}

export default DocumentViewer;
