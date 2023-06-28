import {
    ADDRESS_LIST_CHANGE,
    EVENT_DETAIL_CHANGE,
    EVENT_OPTION_ADD,
    EVENT_OPTION_DELETE,
    EVENT_RESET,
    EVENT_TIME_CHANGE,
    GET_EVENTS_BEGIN,
    GET_EVENTS_ERROR,
    GET_EVENTS_SUCCESS,
    GET_POST_DATA_BEGIN,
    GET_POST_DATA_ERROR,
    GET_POST_DATA_SUCCESS,
    GET_SINGLE_EVENT_SUCCESS,
    POST_NEW_EVENT_BEGIN,
    POST_NEW_EVENT_ERROR,
    POST_NEW_EVENT_SUCCESS,
} from '../utils/actions'
import moment from "moment"

const events_reducer = (state, action) => {
    switch (action.type) {
        case GET_EVENTS_BEGIN:
            return {...state, events_loading: true}

        case GET_EVENTS_SUCCESS:
            return {
                ...state,
                events_loading: false,
                events: action.payload
            }

        case GET_EVENTS_ERROR:
            return {
                ...state,
                events_loading: false,
                events_error: true
            }

        case GET_POST_DATA_BEGIN:
            return {
                ...state,
                new_event_loading: true
            }

        case GET_POST_DATA_SUCCESS:
            return {
                ...state,
                new_event_loading: false,
                new_event: {
                    ...state.new_event,
                    postcodeData: action.payload
                }
            }

        case GET_POST_DATA_ERROR:
            return {
                ...state,
                new_event_loading: false,
                new_event_error: true
            }

        case EVENT_DETAIL_CHANGE:
            if (Object.keys(action.payload).length !== 0) {
                return {
                    ...state,
                    new_event: {
                        ...state.new_event,
                        [action.payload.target.id]: action.payload.target.value
                    }
                }
            }
            return {...state}

        case EVENT_TIME_CHANGE:
            return {
                ...state,
                new_event: {
                    ...state.new_event,
                    timeOptions: state.new_event.timeOptions.map((option, index) => {
                        if (index === action.payload['idx']) {
                            return {
                                ...option,
                                [action.payload['timeKind']]: action.payload.target.value
                            }
                        }
                        return option
                    })
                },
            }

        case ADDRESS_LIST_CHANGE:
            return {
                ...state,
                new_event: {
                    ...state.new_event,
                    addressList: action.payload
                }
            }

        case EVENT_OPTION_ADD:
            return {
                ...state,
                new_event: {
                    ...state.new_event,
                    timeOptions: [...state.new_event.timeOptions, {
                        'startTime': moment().format('HH:mm'),
                        'endTime': moment().add(30, 'minutes').format('HH:mm'),
                    }],
                }
            }

        case EVENT_OPTION_DELETE:
            return {
                ...state,
                new_event: {
                    ...state.new_event,
                    timeOptions: state.new_event.timeOptions.filter((option, index) => {
                        return index !== action.payload['idx']
                    }),
                }
            }

        case EVENT_RESET:
            return {
                ...state,
                new_event: {
                    title: '',
                    postcode: '',
                    postcodeData: null,
                    addressList: [''],
                    chosenDate: moment(new Date()),
                    timeOptions: [
                        {
                            'startTime': moment().format('HH:mm'),
                            'endTime': moment().add(30, 'minutes').format('HH:mm'),
                        }
                    ]

                }
            }

        case POST_NEW_EVENT_BEGIN:
            return {...state, new_event_loading: true}

        case POST_NEW_EVENT_SUCCESS:
            return {...state, new_event_loading: false}

        case POST_NEW_EVENT_ERROR:
            return {...state, new_event_loading: false, new_event_error: true}

        case GET_SINGLE_EVENT_SUCCESS:
            return {...state, new_event_loading: false, single_event: action.payload}

        default:
            throw new Error(`no matching "${action.type}" action type`)
    }
}

export default events_reducer;
