import React, {useEffect, useState} from 'react';
import PageHero from "../components/PageHero";
import {useEventsContext} from "../contexts/events_context";
import {useParams} from "react-router-dom";
import styled from "styled-components";
import {useUtilContext} from "../contexts/util_context";
import moment from "moment";
import {Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select} from "@mui/material";
import {useJoinContext} from "../contexts/join_context";

export default function JoinDetail() {

    const {id} = useParams()

    const {fetchSingleEvent, single_event, new_event_loading} = useEventsContext()

    const {
        chosenTime,
        resetJoinDetail,
        handleJoinDetailChange,
        postJoinDetail
    } = useJoinContext();

    const {logged, id: joinerID} = useUtilContext()

    useEffect(() => {
        // if (!logged) {
        //     window.location.href = '/login'
        // } TODO uncomment this before deploy
        document.title = 'Join Event';
        fetchSingleEvent(id);
    }, [])

    if (new_event_loading) {
        return <main>
            <div className={'notice'}>
                <h2>loading...</h2>
            </div>
        </main>
    }

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
                {['title', 'address', 'date'].map(
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
                                    onChange={handleJoinDetailChange}
                                    input={<OutlinedInput/>}
                                    renderValue={(selected) => {
                                        if (selected.length === 0) {
                                            return 'Select all time choices you like'
                                        }
                                        return `Selected ${selected.length} choice(s)`

                                    }}
                                    MenuProps={MenuProps}
                                >
                                    {single_event['timeOptions']
                                        .replaceAll('_', ' to ')
                                        .split(',').sort().map(
                                            (optionStr, index) =>
                                                (<MenuItem key={index} value={optionStr}>
                                                    <Checkbox checked={chosenTime.includes(optionStr)}/>
                                                    <ListItemText primary={optionStr}/>
                                                </MenuItem>)
                                        )}
                                </Select>
                            </FormControl>
                        </div>
                    </td>
                </tr>

                </tbody>
            </table>
            <div className={"buttons"}>
                <Button variant="contained" onClick={() => postJoinDetail(single_event.id, joinerID)}>
                    Submit</Button>
                <Button variant="outlined" onClick={resetJoinDetail}>
                    Reset</Button>
            </div>
        </main>
    </Wrapper>
}

const Wrapper = styled.section`
  button {
    margin-left: 0.5rem;
  }

  .eventTable {
    justify-content: center;
    border-collapse: collapse;
    margin: auto auto;
    width: 50%;
    font-size: 2em;
  }

  .buttons {
    padding-right: 0.6rem;
    padding-top: 1rem;
    justify-content: center;
    display: flex;
    padding-bottom: 1.5rem;
  }

  .checkBox {
    padding: 0;
  }

  td {
    padding: 10px;
  }
`
