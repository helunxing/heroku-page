import React, {useContext, useReducer} from 'react'
import axios from "axios";

import join_reducer from "../reducers/join_reducer";
import {notifyInfo} from "../utils/functions";
import {status_url} from "../utils/constants"

import {
    JOIN_RESET,
    JOIN_CHANGE,
    JOIN_DETAIL_POST
} from "../utils/actions";

const initialState = {
    chosenTime: [],
    eventID: null,
    joinerID: null,
    selectedStr: null
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

    const postJoinDetail = (eventID, joinerID) => {
        console.log(eventID, joinerID)
        dispatch({
            type: JOIN_DETAIL_POST, payload: {
                eventID,
                joinerID
            }
        })
    }

    return (
        <JoinContext.Provider
            value={{
                ...state,
                resetJoinDetail,
                handleJoinDetailChange,
                postJoinDetail
            }}
        >
            {children}
        </JoinContext.Provider>
    )
}

export const useJoinContext = () => {
    return useContext(JoinContext)
}
