import React, {useEffect} from 'react';
import PageHero from "../components/PageHero";
import EventsList from "../components/EventsList";
import {useEventsContext} from "../contexts/events_context";
import {useParams} from "react-router-dom";
import styled from "styled-components";
import {useUtilContext} from "../contexts/util_context";

const JoinDetail = () => {

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
            {(single_event === {} || Number(id) !== single_event.id) ?
                <div className={'notice'}><h2>loading...</h2></div> :
                <>
                    <PageHero title={event_id} isEvent/>
                    <div>
                        <h2>event title: {title}</h2>
                        <h2>{event_id}</h2>
                    </div>
                </>
            }
        </main>
    </Wrapper>
}

const Wrapper = styled.section`
  .notice {
    padding: 200px;
    height: 500px
  }
`

export default JoinDetail;
