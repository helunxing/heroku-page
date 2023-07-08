import React, {useContext, useReducer} from 'react'
import axios from "axios";

import join_reducer from "../reducers/join_reducer";
import {notifyInfo} from "../utils/functions";
import {status_url} from "../utils/constants"

import {
    JOIN_RESET,
    JOIN_CHANGE
} from "../utils/actions";

const initialState = {
    chosenTime: [],
    eventId: null,
    joinerId: null,
    selected: null
}

const JoinContext = React.createContext()
export const JoinProvider = ({children}) => {

    const [state, dispatch] = useReducer(join_reducer, initialState)

    const resetJoinDetail = () => {
        dispatch({type: JOIN_RESET})
    }

    const handleJoinDetailChange = (e) => {
        dispatch({type: JOIN_CHANGE, payload: e['target']['value']})
    }

    return (
        <JoinContext.Provider
            value={{
                ...state,
                resetJoinDetail,
                handleJoinDetailChange
            }}
        >
            {children}
        </JoinContext.Provider>
    )
}

export const useJoinContext = () => {
    return useContext(JoinContext)
}
