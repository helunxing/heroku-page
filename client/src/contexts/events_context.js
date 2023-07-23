import React, {useContext, useReducer} from 'react';
import axios from 'axios';

import events_reducer from '../reducers/events_reducer';
import {events_url, postcode_url, single_events_url} from '../utils/constants';
import {
    ADDRESS_LIST_CHANGE,
    EVENT_DETAIL_CHANGE,
    EVENT_OPTION_ADD,
    EVENT_OPTION_DELETE,
    EVENT_RESET,
    EVENT_TIME_CHANGE,
    GET_EVENTS_BEGIN,
    GET_EVENTS_ERROR,
    GET_EVENTS_SUCCESS,
    GET_SINGLE_EVENT_BEGIN,
    GET_SINGLE_EVENT_ERROR,
    GET_SINGLE_EVENT_SUCCESS,
    GET_POST_DATA_BEGIN,
    GET_POST_DATA_ERROR,
    GET_POST_DATA_SUCCESS,
    POST_NEW_EVENT_BEGIN,
    POST_NEW_EVENT_SUCCESS,
    POST_NEW_EVENT_ERROR,
    UPLOAD_EVENT_COUNT_DOWN, UPLOAD_EVENT
} from '../utils/actions'
import moment from "moment/moment";
import {notifyInfo} from "../utils/functions";
import {useUtilContext} from "./util_context";
import StatusCodes from "http-status-codes";

const initialState = {
    events_loading: false,
    events_error: false,
    events: [],

    new_event_loading: false,
    new_event_error: false,
    new_event_uploading: false,

    post_new_event_loading: false,
    post_new_event_error: false,

    new_event: {
        title: '',
        postcode: '',
        postcodeData: null,
        addressList: [''],
        chosenDate: moment(new Date()),
        timeOptions: []
    },

    single_event: {}
}

const EventsContext = React.createContext()
export const EventsProvider = ({children}) => {
    const [state, dispatch] = useReducer(events_reducer, initialState)

    const {logged, id} = useUtilContext()

    const fetchSingleEvent = async (eventId) => {
        dispatch({type: GET_SINGLE_EVENT_BEGIN})
        try {
            const response = await axios.get(single_events_url + '/' + eventId)
            const event = response.data
            dispatch({type: GET_SINGLE_EVENT_SUCCESS, payload: event})
        } catch (error) {
            dispatch({type: GET_SINGLE_EVENT_ERROR})
        }
    }

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

    const postEventInfo = async () => {
        if (state.new_event_uploading) return
        dispatch({type: UPLOAD_EVENT})
        setTimeout(() => {
            dispatch({type: UPLOAD_EVENT_COUNT_DOWN})
        }, 5000)
        dispatch({type: POST_NEW_EVENT_BEGIN})
        try {
            const filteredBody = {
                'title': state.new_event['title'],
                'date': state.new_event['chosenDate'].format('YYYY-MM-DD'),
                'address':
                    state.new_event["addressList"]
                        .filter((addr_line) => addr_line !== "")
                        .reverse()
                        .concat([state.new_event["postcode"]])
                        .join('\n'),
                'creatorId': logged ? id : 1, // TODO: this information security is unsafe
                'timeOptions':
                    Array.from(new Set(state.new_event['timeOptions']))
                        .sort()
                        .map((option) => {
                            return option['startTime'] + '_' + option['endTime']
                        })
                        .join(','),
            }
            const response = await axios.post(events_url, filteredBody)
            if (response.status === StatusCodes.CREATED) {
                dispatch({type: POST_NEW_EVENT_SUCCESS})
                notifyInfo('Create success, jumping to detail page...')
                // TODO: console.log(response.headers['location'])
                setTimeout(() => {
                    window.location.href = response.headers['location']
                }, 4500)
            } else {
                dispatch({type: POST_NEW_EVENT_ERROR})
                alert('create failed')
            }
        } catch (error) {
            dispatch({type: POST_NEW_EVENT_ERROR})
            alert('connecting error')
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
        handleEventDetailChange,
        handleEventTimeChange,
        fetchSingleEvent,

        fetchPostcodeData,
        setPostcodeData,
        postEventInfo
    }}>
        {children}
    </EventsContext.Provider>);
}
export const useEventsContext = () => {
    return useContext(EventsContext)
}
