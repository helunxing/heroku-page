import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Footer from "./components/Footer";

import Home from "./pages/home"
import Notfound from "./pages/notfound";

function App() {

    return (
        <Router>

            <NavBar/>

            <SideBar/>

            <Routes>

                <Route path={'/'} element={
                    <Home/>}/>

                <Route path={'/join'} element={
                    <h2>join page</h2>}/>

                <Route path={'/me'} element={
                    <h2>Dashboard page</h2>}/>))}

                <Route path={'/e'} element={
                    <h2>events page</h2>}/>))}
                <Route path={'/events'} element={
                    <h2>events page</h2>}/>))}

                <Route path="*" element={
                    <Notfound/>}/>

            </Routes>

            <Footer/>

        </Router>
    );
}

export default App
