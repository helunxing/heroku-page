import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Footer from "./components/Footer";

import Home from "./pages/home"
import Notfound from "./pages/notfound";
import Event from "./pages/event";
import Join from "./pages/join";

function App() {



    return (
        <Router>

            <NavBar/>

            <SideBar/>

            <Routes>

                <Route path={'/'} element={
                    <Home/>
                }/>

                <Route path={'/me'} element={
                    <h2>Dashboard page</h2>
                }/>

                <Route path={'/event'} element={
                    <Event/>
                }/>

                <Route path={'/event/:id'} element={
                    <h2>hello</h2>
                }/>

                <Route path={'/join'} element={
                    <Join/>
                }/>

                <Route path="*" element={
                    <Notfound/>
                }/>

            </Routes>

            <Footer/>

        </Router>
    );
}

export default App
