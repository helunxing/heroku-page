import {
    SIDEBAR_OPEN,
    SIDEBAR_CLOSE,
} from '../utils/actions'

const util_reducer = (state, action) => {
    switch (action.type) {
        case SIDEBAR_OPEN:
            return {...state, isSideBarOpen: true}
        case SIDEBAR_CLOSE:
            return {...state, isSideBarOpen: false}
        default:
            throw new Error(`no matching "${action.type}" action type`)
    }
}

export default util_reducer;
