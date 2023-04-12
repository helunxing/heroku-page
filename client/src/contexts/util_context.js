import React, {useContext, useReducer} from 'react'
import axios from "axios";

import util_reducer from "../reducers/util_reducer";
import {status_url} from "../utils/constants"
import {
    GET_LOGIN_BEGIN,
    GET_LOGIN_ERROR,
    GET_LOGIN_SUCCESS,

    SIDEBAR_CLOSE,
    SIDEBAR_OPEN
} from "../utils/actions";


const initialState = {
    isSideBarOpen: false,

    login_loading: false,
    login_error: false,
    logged: false,
    name: '',
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

    const getLoginStatus = async () => {
        dispatch({type: GET_LOGIN_BEGIN})
        try {
            const res = await axios.get(status_url)
            dispatch({type: GET_LOGIN_SUCCESS, payload: res.data})
        } catch (error) {
            dispatch({type: GET_LOGIN_ERROR})
        }
    }

    return (
        <UtilContext.Provider
            value={{
                ...state,
                openSidebar,
                closeSidebar,
                getLoginStatus
            }}
        >
            {children}
        </UtilContext.Provider>
    )
}

export const useUtilContext = () => {
    return useContext(UtilContext)
}
