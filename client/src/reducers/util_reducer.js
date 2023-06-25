import {
    GET_LOGIN_BEGIN,
    GET_LOGIN_ERROR,
    GET_LOGIN_SUCCESS,
    SIDEBAR_CLOSE,
    SIDEBAR_OPEN
} from '../utils/actions'

const util_reducer = (state, action) => {
    switch (action.type) {
        case SIDEBAR_OPEN:
            return {...state, isSideBarOpen: true}

        case SIDEBAR_CLOSE:
            return {...state, isSideBarOpen: false}

        case GET_LOGIN_BEGIN:
            return {...state, login_loading: true}

        case GET_LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload,
                login_loading: false,
            }

        case GET_LOGIN_ERROR:
            return {
                ...state,
                login_loading: false,
                login_error: true
            }

        default:
            throw new Error(`no matching "${action.type}" action type`)
    }
}

export default util_reducer;
