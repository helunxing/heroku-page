import React, {useContext, useEffect, useReducer, useState} from 'react';
import axios from 'axios';

import events_reducer from '../reducers/events_reducer';
import {events_url, postcode_url} from '../utils/constants';
import {
    GET_EVENTS_BEGIN,
    GET_EVENTS_SUCCESS,
    GET_EVENTS_ERROR,

    GET_POST_DATA_BEGIN,
    GET_POST_DATA_SUCCESS,
    GET_POST_DATA_ERROR,

    EVENT_RESET,
    EVENT_DETAIL_CHANGE,
    EVENT_OPTION_ADD,
    EVENT_OPTION_DELETE,
    EVENT_TIME_CHANGE,
    ADDRESS_LIST_CHANGE,

} from '../utils/actions'
import moment from "moment/moment";

const initialState = {
    events_loading: false,
    events_error: false,
    events: [],

    new_event_loading: false,
    new_event_error: false,
    new_event: {
        title: '',
        postcode: '',
        postcodeData: null,
        addressList: [''],
        chosenDate: moment(new Date()),
        timeOptions: []
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
            const response = await axios.get(events_url)
            const events = Array.from(response.data)
            dispatch({type: GET_EVENTS_SUCCESS, payload: events})
        } catch (error) {
            dispatch({type: GET_EVENTS_ERROR})
        }
    }

    const resetEvent = () => {
        dispatch({type: EVENT_RESET})
    }

    const handleEventDetailChange = (e) => {
        if (e._isAMomentObject) {
            dispatch({type: EVENT_DETAIL_CHANGE, payload: {target: {id: 'chosenDate', value: e}}})
            return
        }
        dispatch({type: EVENT_DETAIL_CHANGE, payload: e})
    }

    const handleEventTimeChange = (e, idx, timeKind) => {
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

    const fetchPostcodeData = async () => {
        dispatch({type: GET_POST_DATA_BEGIN})
        try {
            const res = await axios.get(`${postcode_url}/${state.new_event.postcode}`)
            dispatch({type: GET_POST_DATA_SUCCESS, payload: res.data})
        } catch (error) {
            dispatch({type: GET_POST_DATA_ERROR})
        }
    }

    const setPostcodeData = (level, data) => {
        let newAddressList = state.new_event.addressList

        if (level < newAddressList.length) {
            newAddressList = newAddressList.slice(0, level)
        }

        while (level >= newAddressList.length) {
            newAddressList.push('')
        }

        newAddressList[level] = data

        dispatch({type: ADDRESS_LIST_CHANGE, payload: newAddressList})
    }

    return (<EventsContext.Provider value={{
        ...state,
        fetchEvents,

        resetEvent,
        handleDetailChange: handleEventDetailChange,
        handleTimeChange: handleEventTimeChange,

        fetchPostcodeData,
        setPostcodeData
    }}>
        {children}
    </EventsContext.Provider>);
}
export const useEventsContext = () => {
    return useContext(EventsContext)
}
