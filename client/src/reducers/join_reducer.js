import {
    JOIN_CHANGE,
    JOIN_DETAIL_POST,
    JOIN_RESET
} from '../utils/actions'

const join_reducer = (state, action) => {
    switch (action.type) {
        case JOIN_RESET:
            return {
                chosenTime: [],
                eventID: null,
                joinerID: null,
                selectedStr: null
            }

        case JOIN_CHANGE:
            return {
                ...state,
                chosenTime: action.payload
            }

        case JOIN_DETAIL_POST:
            return {
                ...state,
                selectedStr: state.chosenTime
                    .join(',')
                    .replaceAll(' to ', '_'),
                eventID: action.payload.eventID,
                joinerID: action.payload.joinerID,
            }

        default:
            throw new Error(`no matching "${action.type}" action type`)
    }
}

export default join_reducer;