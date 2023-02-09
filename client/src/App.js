import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Footer from "./components/Footer";

function App() {
    const [data, setDate] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        // fetch('/postcode/gxpoigeeg')
        //     .then((res) => res.json())
        //     .then((data) => setDate(data));

        // const res = await fetch('/status');
        // const status_json = await res.json();

    }, [])

    return (
        <Router>

            <NavBar/>

            <SideBar/>

            <Routes>
                <Route path={'/'} element={
                    // <Choice dataList={data}/>
                    <h2>home page</h2>
                }/>
                <Route path={'/about'} element={
                    <h2>about page</h2>
                }/>
                <Route path={'/events'} element={
                    <h2>events page</h2>
                }/>
            </Routes>

            <Footer/>

        </Router>
    );
}

export default App;
