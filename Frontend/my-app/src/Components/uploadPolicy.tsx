import {useState, useEffect} from "react";

const options = [
    {
        "id":1,
        "name": "Policy"
    }
]



function uploadPolicy () {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        type:"",
        link:"",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log(formData);

        await fetch("http://localhost:3000/api/policy/", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(formData),
        });

    };

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/policyType/');
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
    return(
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>Name:</label><br/>
                    <input
                        name="name"
                        id= "Fname"
                        placeholder="Policy Name"
                        value={formData.name}
                        onChange={handleChange}
                    /><br/>
                    <label>Link:</label><br/>
                    <input
                        name="link"
                        placeholder="Policy Link"
                        value={formData.link}
                        onChange={handleChange}
                    /><br/>
                    <label>Decription:</label><br/>
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                    /><br/>
                    <label>Type:</label><br/>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                    >

                        {data["policyTypes"].map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </select><br/>
                    <button type="submit">Submit</button>

                </form>
            </div>
        </>
    )

}

export default uploadPolicy








