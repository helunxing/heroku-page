import {useState, useEffect} from "react";

function App() {
    const [data, setDate] = useState(null);
    useEffect(() => {
        fetch('/api')
            .then((res) => res.json())
            .then((data) => setDate(data.message));
    }, [])
    return (
        <h1> {!data ? "Loading" : data} </h1>
    );
}

export default App;
