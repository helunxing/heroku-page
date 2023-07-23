import React, {useContext, useReducer} from 'react'
import axios from "axios"

import join_reducer from "../reducers/join_reducer"
import {notifyInfo} from "../utils/functions"
import {join_url} from "../utils/constants"
import {StatusCodes} from 'http-status-codes'

import {
    JOIN_RESET,
    JOIN_CHANGE,
    JOIN_DETAIL_POST,
} from "../utils/actions"
import {useUtilContext} from "./util_context";

const initialState = {
    chosenTime: [],
    eventID: null,
    joinerID: null,
    selectedStr: null
}

const JoinContext = React.createContext()
export const JoinProvider = ({children}) => {

    const [state, dispatch] = useReducer(join_reducer, initialState)

    const {logged, id} = useUtilContext()

    const resetJoinDetail = () => {
        dispatch({type: JOIN_RESET})
    }

    const handleJoinDetailChange = (e) => {
        dispatch({type: JOIN_CHANGE, payload: e['target']['value']})
    }

    const postJoinDetail = async (eventID, joinerID) => {
        const detailBody = {
            eventId: eventID,
            userId: logged ? id : 1,// TODO: this information security is unsafe
            selectedStr: state.chosenTime
                .join(',')
                .replaceAll(' to ', '_')
        }
        try {
            const response = await axios.put(join_url, detailBody)
            if (response.status === StatusCodes.CREATED) {
                notifyInfo('Submit success')
            } else {
                alert('Submit failed')
            }
        } catch (error) {
            console.log(error)
            alert('connecting error')
        }
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
