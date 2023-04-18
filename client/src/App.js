import React from "react";
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
import NotifyPart from "./components/NotifyPart";

function App() {


    return (
        <Router>

            <NotifyPart/>

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
                    <>
                        <PageHero title={'pore'} isEvent/>
                        <h2>detail page</h2>
                    </>
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
