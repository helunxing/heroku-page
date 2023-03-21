import {
    GET_EVENTS_BEGIN,
    GET_EVENTS_SUCCESS,
    GET_EVENTS_ERROR,

    GET_POSTDATA_BEGIN,
    GET_POSTDATA_SUCCESS,
    GET_POSTDATA_ERROR,

    EVENT_RESET,
    EVENT_DETAIL_CHANGE,
    EVENT_OPTION_ADD,
    EVENT_OPTION_DELETE,
    EVENT_TIME_CHANGE,
} from '../utils/actions'
import moment from "moment"
import {options} from "axios"

const events_reducer = (state, action) => {
    switch (action.type) {
        case GET_EVENTS_BEGIN:
            return {...state, events_loading: true}

        case GET_EVENTS_SUCCESS:
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

        case GET_POSTDATA_BEGIN:
            return {
                ...state,
                new_event_loading: true
            }

        case GET_POSTDATA_SUCCESS:
            return {
                ...state,
                new_event_loading: false,
                new_event: {
                    ...state.new_event,
                    postcodeData: action.payload
                }
            }

        case GET_POSTDATA_ERROR:
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
                    options: state.new_event.options.map((option, index) => {
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

        case EVENT_OPTION_ADD:
            return {
                ...state,
                new_event: {
                    ...state.new_event,
                    options: [...state.new_event.options, {
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
                    options: state.new_event.options.filter((option, index) => {
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
                    chosenDate: moment(new Date()),
                    timeOptions: [
                        {
                            'startTime': moment().format('HH:mm'),
                            'endTime': moment().add(30, 'minutes').format('HH:mm'),
                        }
                    ]

                }
            }

        default:
            throw new Error(`no matching "${action.type}" action type`)
    }
}

export default events_reducer;
