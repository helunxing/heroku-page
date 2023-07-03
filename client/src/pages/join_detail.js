import React, {useEffect} from 'react';
import PageHero from "../components/PageHero";
import EventsList from "../components/EventsList";
import {useEventsContext} from "../contexts/events_context";
import {useParams} from "react-router-dom";
import styled from "styled-components";
import {useUtilContext} from "../contexts/util_context";
import moment from "moment";
import {Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select} from "@mui/material";

export default function JoinDetail() {

    const {id} = useParams()

    const {logged} = useUtilContext()

    const {fetchSingleEvent, single_event} = useEventsContext()

    useEffect(() => {
        // if (!logged) {
        //     window.location.href = '/login'
        // }
        document.title = 'Join Event';
        fetchSingleEvent(id);
    }, [])


    if (Object.keys(single_event).length === 0) {
        return <main>
            <div className={'notice'}>
                <h2>no event founded</h2>
            </div>
        </main>
    }


    return <Wrapper>
        <main>
            <table className={'eventTable'}>
                <tbody>
                {['title', 'date', 'address'].map(
                    (key) =>
                        (<tr key={key}>
                            <td>{key}</td>
                            <td>{single_event[key]}</td>
                        </tr>)
                )}
                <tr>
                    <td key={'Options'}>options</td>
                    <td className={'checkBox'}>
                        <div>
                            <FormControl sx={{m: 1, width: 300}}>
                                <InputLabel id="time-multiple-checkbox-label">Choice all time you like</InputLabel>
                                <Select
                                    labelId="time-multiple-checkbox-label"
                                    id="time-multiple-checkbox"
                                >
                                    {single_event['timeOptions'].split(',').map(
                                        (letter) =>
                                            (<MenuItem key={letter} value={letter}>
                                                <Checkbox checked/>
                                                <ListItemText primary={letter}/>
                                            </MenuItem>)
                                    )}
                                </Select>
                            </FormControl>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>

        </main>
    </Wrapper>
}

const Wrapper = styled.section`
  .eventTable {
    border-collapse: collapse;
    margin: auto auto 20px;
    width: 50%;
    font-size: 2em;
  }

  .checkBox {
    padding: 0;
  }

  td {
    padding: 10px;
  }
`
