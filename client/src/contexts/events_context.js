import React, {useContext, useEffect, useReducer, useState} from 'react';
import axios from 'axios';

import events_reducer from '../reducers/events_reducer';
import {events_url as url} from '../utils/constants';
import {
    GET_EVENTS_BEGIN,
    GET_EVENTS_SUCCESS,
    GET_EVENTS_ERROR, EVENT_DETAIL_CHANGE, EVENT_RESET, EVENT_OPTION_ADD, EVENT_TIME_CHANGE, EVENT_OPTION_DELETE,
} from '../utils/actions'
import moment from "moment/moment";

const initialState = {
    events_loading: false,
    events_error: false,
    events:
        [{
            id: 1,
            title: 'meeting',
            date: 'today',
            duration: '2hours',
            option: [
                '14',
            ]
        }, {
            id: 2,
            title: 'eating',
            date: 'tomorrow'
        }, {
            id: 3,
            title: 'ran',
            date: 'jan 23'
        },
        ],
    new_event: {
        title: '',
        chosenDate: moment(new Date()),
        postcode: '',
        options: []
    },
    single_event_loading: false,
    single_event_error: false,
    single_event: {}
}

const EventsContext = React.createContext()
export const EventsProvider = ({children}) => {
    const [state, dispatch] = useReducer(events_reducer, initialState)

    const fetchEvents = async () => {
        dispatch({type: GET_EVENTS_BEGIN})
        try {
            const response = await axios.get(url)
            const events = Array.from(response.data)
            console.log(events)
            dispatch({type: GET_EVENTS_SUCCESS, payload: events})
        } catch (error) {
            dispatch({type: GET_EVENTS_ERROR})
        }
    }

    const resetEvent = () => {
        dispatch({type: EVENT_RESET})
    }

    const handleDetailChange = (e) => {
        if (e._isAMomentObject) {
            dispatch({type: EVENT_DETAIL_CHANGE, payload: {target: {id: 'chosenDate', value: e}}})
            return
        }
        dispatch({type: EVENT_DETAIL_CHANGE, payload: e})
    }

    const handleTimeChange = (e, idx, timeKind) => {
        e['idx'] = idx
        e['timeKind'] = timeKind
        if (timeKind === 'delete') {
            dispatch({type: EVENT_OPTION_DELETE, payload: e})
        } else if (timeKind === 'add') {
            dispatch({type: EVENT_OPTION_ADD, payload: e})
        } else {
            dispatch({type: EVENT_TIME_CHANGE, payload: e})
        }
    }

    const showAll = () => {
        console.log(state)
    }

    return (<EventsContext.Provider value={{
        ...state,
        fetchEvents,
        resetEvent,
        handleDetailChange,
        handleTimeChange,

        showAll
    }}>
        {children}
    </EventsContext.Provider>);
}
export const useEventsContext = () => {
    return useContext(EventsContext)
}
