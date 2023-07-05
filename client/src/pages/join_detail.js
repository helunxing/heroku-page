import React, {useEffect, useState} from 'react';
import PageHero from "../components/PageHero";
import EventsList from "../components/EventsList";
import {useEventsContext} from "../contexts/events_context";
import {useParams} from "react-router-dom";
import styled from "styled-components";
import {useUtilContext} from "../contexts/util_context";
import moment from "moment";
import {Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select} from "@mui/material";
import {useJoinContext} from "../contexts/join_context";

export default function JoinDetail() {

    const {id} = useParams()

    const {logged} = useUtilContext()

    const {fetchSingleEvent, single_event} = useEventsContext()

    const [chosenTime, setChosenTime] = useState([]);

    const handleChange = (event) => {
        const {
            target: {value},
        } = event;
        setChosenTime(
            typeof value === 'string' ? value.split(",") : value
        )
    }
    // const {} = useJoinContext()

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

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

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
                                <Select
                                    labelId="time-multiple-checkbox-label"
                                    id="time-multiple-checkbox"
                                    multiple
                                    displayEmpty
                                    value={chosenTime}
                                    onChange={handleChange}
                                    input={<OutlinedInput/>}
                                    renderValue={(selected) => {
                                        if (selected.length === 0) {
                                            return 'Select all time choices you like'
                                        }
                                        return selected.join(', ')
                                    }}
                                    MenuProps={MenuProps}
                                >
                                    {single_event['timeOptions'].split(',').map(
                                        (index, value) =>
                                            (<MenuItem key={value} value={value}>
                                                <Checkbox checked={chosenTime.indexOf(value) >= 0}/>
                                                <ListItemText primary={value}/>
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
