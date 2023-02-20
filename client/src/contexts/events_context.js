import React, {useContext, useEffect, useReducer, useState} from 'react';
import axios from 'axios';

import events_reducer from '../reducers/events_reducer';
import {events_url as url} from '../utils/constants';
import {
    GET_EVENTS_BEGIN,
    GET_EVENTS_SUCCESS,
    GET_EVENTS_ERROR,
} from '../utils/actions'

const initialState = {
    events_loading: false,
    events_error: false,
    events: [],
    featured_events: [],
    single_product_loading: false,
    single_product_error: false,
    single_product: {}
}

const EventsContext = React.createContext()
export const EventsProvider = ({children}) => {
    const [state, dispatch] = useReducer(events_reducer, initialState)

    const fetchEvents = async (url) => {
        dispatch({type: GET_EVENTS_BEGIN})
        try {
            const response = await axios.get(url)
            const events = response.data
            dispatch({type: GET_EVENTS_SUCCESS, payload: events})
        } catch (error) {
            dispatch({type: GET_EVENTS_ERROR})
        }
    }

    useEffect(() => {
        fetchEvents(url)
    }, [])

    return (<EventsContext.Provider value={{
        ...state,
    }}>
        {children}
    </EventsContext.Provider>);
}
export const useEventsContext = () => {
    return useContext(EventsContext)
}
