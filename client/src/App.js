import React from "react";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Footer from "./components/Footer";

import Home from "./pages/home"
import Notfound from "./pages/notfound";
import Event from "./pages/event";
import Join from "./pages/join";
import PageHero from "./components/PageHero";
import Me from "./pages/me";
import JoinDetail from "./pages/join_detail";

function App() {


    return (
        <Router>

            <ToastContainer/>

            <NavBar/>

            <SideBar/>

            <Routes>

                <Route path={'/'} element={
                    <Home/>
                }/>

                <Route path={'/me'} element={
                    <Me/>
                }/>

                <Route path={'/event'} element={
                    <Event/>
                }/>

                <Route path={'/join'} element={
                    <Join/>
                }/>

                <Route path={'/join/:id'} element={
                    <JoinDetail/>
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
