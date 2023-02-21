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
    events: [{
        id: 1,
        title: 'meeting',
        date: 'today'
    }, {
        id: 2,
        title: 'eating',
        date: 'tomorrow'
    },{
        id: 3,
        title: 'ran',
        date: 'jan 23'
    }, {
        id: 4,
        title: 'boeng',
        date: 'todgeoghay'
    }, {
        id: 5,
        title: 'meetingwpoi3tng',
        date: 'todaybpoiwej'
    }, ],
    featured_events: [],
    single_event_loading: false,
    single_event_error: false,
    single_event: {}
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
        fetchEvents,
    }}>
        {children}
    </EventsContext.Provider>);
}
export const useEventsContext = () => {
    return useContext(EventsContext)
}
