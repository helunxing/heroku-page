import React from 'react';
import ReactDOM from 'react-dom/client';
import './utils/utils.css';
import App from './App';

import {EventsProvider} from './contexts/events_context';
import {UserProvider} from './contexts/util_context';

import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {JoinProvider} from "./contexts/join_context";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <UserProvider>
            <EventsProvider>
                <JoinProvider>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <App/>
                    </LocalizationProvider>
                </JoinProvider>
            </EventsProvider>
        </UserProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
