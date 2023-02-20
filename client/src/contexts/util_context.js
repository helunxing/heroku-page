import React, {useContext, useEffect, useReducer, useState} from 'react'
import axios from "axios";

import util_reducer from "../reducers/util_reducer";
import {status_url, profile_url} from "../utils/constants"
import {
    SIDEBAR_CLOSE,
    SIDEBAR_OPEN,
    GET_USER_STATUS, GET_USER_BEGIN, GET_EVENTS_SUCCESS, GET_USER_ERROR, GET_USER_SUCCESS
} from "../utils/actions";


const initialState = {
    isSideBarOpen: false,
    isLogged: false,
    logged_loading: false,
    logged_error: false,
    userinfo: {}
}

// user_nickname: '',
// user_sub: '',
// user_id: '',

const UtilContext = React.createContext()
export const UserProvider = ({children}) => {

    const [state, dispatch] = useReducer(util_reducer, initialState)

    const openSidebar = () => {
        dispatch({type: SIDEBAR_OPEN})
    }

    const closeSidebar = () => {
        dispatch({type: SIDEBAR_CLOSE})
    }

    const getUserStatus = async () => {
        dispatch({type: GET_USER_BEGIN})
        try  {
            const response = await axios.get(status_url)
            const isLogged = response.data['logged'] === 'in'
            if (!isLogged) {
                dispatch({type: GET_USER_SUCCESS, payload: {isLogged}})
                return
            }
            const profile_res = await axios.get(profile_url)
            const {sub, nickname} = profile_res.data;
            const userinfo = {user_nickname: nickname, user_sub: sub}
            dispatch({type: GET_USER_SUCCESS, payload: {isLogged, userinfo}})
        } catch
            (error) {
            dispatch({type: GET_USER_ERROR})
        }
    }

    return (
        <UtilContext.Provider
            value={{
                ...state,
                openSidebar,
                closeSidebar,
                getUserStatus
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
