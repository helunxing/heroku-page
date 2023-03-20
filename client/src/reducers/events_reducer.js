import {
    GET_EVENTS_BEGIN,
    GET_EVENTS_SUCCESS,
    GET_EVENTS_ERROR,
    EVENT_DETAIL_CHANGE,
    EVENT_OPTION_ADD,
    EVENT_OPTION_DELETE,
    EVENT_RESET,
    EVENT_TIME_CHANGE
} from '../utils/actions'
import moment from "moment";
import {options} from "axios";

const events_reducer = (state, action) => {
    switch (action.type) {
        case GET_EVENTS_BEGIN:
            return {...state, events_loading: true}
        case GET_EVENTS_SUCCESS:
            // const featured_products=action.payload;
            // .filter((event)=>product.)
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
            // console.log(action.payload)
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
                    chosenDate: moment(new Date()),
                    postcode: '',
                    options: [
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
