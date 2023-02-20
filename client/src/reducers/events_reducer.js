import {
    GET_EVENTS_BEGIN,
    GET_EVENTS_SUCCESS,
    GET_EVENTS_ERROR
} from '../utils/actions'

const events_reducer = (state, action) => {
    switch (action.type) {
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
                events_error: true
            }
        default:
            throw new Error(`no matching "${action.type}" action type`)
    }
}

export default events_reducer;
