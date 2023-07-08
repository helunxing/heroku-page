import {
    JOIN_CHANGE,
    JOIN_RESET
} from '../utils/actions'

const join_reducer = (state, action) => {
    switch (action.type) {
        case JOIN_RESET:
            return {
                chosenTime: [],
                singleEventID: null,
                eventId: null,
                joinerId: null,
                selected: null
            }

        case JOIN_CHANGE:
            return {
                ...state,
                chosenTime: action.payload
            }

        default:
            throw new Error(`no matching "${action.type}" action type`)
    }
}

export default join_reducer;
