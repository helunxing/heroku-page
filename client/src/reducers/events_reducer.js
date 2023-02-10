import {
    SIDEBAR_OPEN,
    SIDEBAR_CLOSE,
    GET_EVENTS_BEGIN,
    GET_EVENTS_SUCCESS,
    GET_EVENTS_ERROR
} from '../utils/actions'

const events_reducer = (state, action) => {
    switch (action.type) {
        case SIDEBAR_OPEN:
            return {...state, isSideBarOpen: true}
        case SIDEBAR_CLOSE:
            return {...state, isSideBarOpen: false}
        case GET_EVENTS_BEGIN:
            return {...state, events_loading: true}
        case GET_EVENTS_SUCCESS:
            // const featured_products=action.payload;
            // .filter(                (event)=>product.            )
            return {
                ...state,
                events_loading: false,
                events: action.payload
            };
        case GET_EVENTS_ERROR:
            return {
                ...state,
                events_loading: false,
                single_product_error: true
            }
        default:
            throw new Error(`no matching "${action.type}" action type`)
    }
}

export default events_reducer;