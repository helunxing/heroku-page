import {
    INFO_POSTED,
    INFO_POSTED_COUNT_DOWN,
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
                selectedStr: null,
                infoUploading: false,
            }

        case JOIN_CHANGE:
            return {
                ...state,
                chosenTime: action.payload
            }

        case INFO_POSTED:
            return {
                ...state,
                infoUploading: true
            }
            
        case INFO_POSTED_COUNT_DOWN:
            return {
                ...state,
                infoUploading: false
            }

        default:
            throw new Error(`no matching "${action.type}" action type`)
    }
}

export default join_reducer;
