import React, {useContext, useEffect, useReducer, useState} from 'react'
import util_reducer from "../reducers/util_reducer";
import {
    SIDEBAR_CLOSE,
    SIDEBAR_OPEN
} from "../utils/actions";

const initialState = {
    isSideBarOpen: false,
}

const UtilContext = React.createContext()
export const UserProvider = ({children}) => {

    const [state, dispatch] = useReducer(util_reducer, initialState)

    const openSidebar = () => {
        dispatch({type: SIDEBAR_OPEN})
    }

    const closeSidebar = () => {
        dispatch({type: SIDEBAR_CLOSE})
    }

    return (
        <UtilContext.Provider
            value={{
                ...state,
                openSidebar,
                closeSidebar
            }}
        >
            {children}
        </UtilContext.Provider>
    )
}
// make sure use
export const useUtilContext = () => {
    return useContext(UtilContext)
}
