import {
    SIDEBAR_OPEN, SIDEBAR_CLOSE,
    GET_USER_BEGIN, GET_USER_SUCCESS, GET_USER_ERROR
} from '../utils/actions'

const util_reducer = (state, action) => {
    switch (action.type) {
        case SIDEBAR_OPEN:
            return {...state, isSideBarOpen: true}
        case SIDEBAR_CLOSE:
            return {...state, isSideBarOpen: false}
        case GET_USER_BEGIN:
            return {...state, logged_loading: true}
        case GET_USER_SUCCESS:
            return {...state, logged_loading: false, ...action.payload}
        case GET_USER_ERROR:
            return {...state, logged_error: true}
        default:
            throw new Error(`no matching "${action.type}" action type`)
    }
}

export default util_reducer;
