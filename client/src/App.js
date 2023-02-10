import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Footer from "./components/Footer";

import Home from "./pages/home"

function App() {
    const [data, setDate] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

    }, [])

    return (
        <Router>

            <NavBar/>

            <SideBar/>

            <Routes>
                <Route path={'/'} element={
                    <Home/>
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
