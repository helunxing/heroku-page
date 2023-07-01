import React, {useEffect} from 'react';
import PageHero from "../components/PageHero";
import EventsList from "../components/EventsList";
import {useEventsContext} from "../contexts/events_context";
import {useParams} from "react-router-dom";
import styled from "styled-components";
import {useUtilContext} from "../contexts/util_context";

export default function JoinDetail() {

    const {id} = useParams()

    const {logged} = useUtilContext()

    const {fetchSingleEvent, single_event} = useEventsContext()

    const {id: event_id, title, description, image, date, time, postcode, address, status} = single_event

    useEffect(() => {
        if (!logged) {
            window.location.href = '/login'
        }
        document.title = 'Join Event';
        fetchSingleEvent(id);
    }, [])

    return <Wrapper>
        <main>
            <table className={'eventTable'}>
                <tbody>
                {['title', 'address'].map(
                    (key) => (<tr>
                        <td>{key}</td>
                        <td>{single_event[key]}</td>
                    </tr>))}
                </tbody>
            </table>
            <div className={'eventTable'}>
                {

                }
            </div>
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
  td {
    padding: 10px;
  }
`
