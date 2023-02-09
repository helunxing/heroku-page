import React, {useContext, useEffect, useReducer, useState} from 'react'
import events_reducer from '../reducers/events_reducer';
import {events_url as url} from '../utils/constants';
import {
    SIDEBAR_OPEN,
    SIDEBAR_CLOSE,
} from '../utils/actions'

const initialState = {
    isSideBarOpen: false,
    events_loading: false,
    events_error: false,
    events: [],

    single_product_loading: false,
    single_product_error: false,
    single_product: {}
}

const EventsContext = React.createContext()
export const EventsProvider = ({children}) => {
    const [state, dispatch] = useReducer(events_reducer, initialState);

    const openSidebar = () => {
        dispatch({type: SIDEBAR_OPEN});
    }
    const closeSidebar = () => {
        dispatch({type: SIDEBAR_CLOSE});
    }

    return (<EventsContext.Provider value={{
        ...state,
        openSidebar,
        closeSidebar
    }}>
        {children}
    </EventsContext.Provider>);
}
export const useEventsContext = () => {
    return useContext(EventsContext)
}
