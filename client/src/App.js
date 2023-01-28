import {useState, useEffect} from "react";
import CheckboxWithLabel from "./components/CheckboxWithLabel";
import Choice from "./components/Choice";

function App() {
    const [data, setDate] = useState(null);

    useEffect(() => {
        fetch('/postcode/gxpoigeeg')
            .then((res) => res.json())
            .then((data) => setDate(data));
    }, [])

    return (
        <>
            <div>
                {/*<Choice dataList={data}/>*/}
            </div>
        </>
    );
}

export default App;
