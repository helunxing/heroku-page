import React, {useEffect} from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";

import {useEventsContext} from "../contexts/events_context";
import EventsList from "../components/EventsList";
import PageHero from "../components/PageHero";

const Join = () => {

    const {events, fetchEvents} = useEventsContext();

    useEffect(() => {
        document.title = 'Join';
        fetchEvents();
    }, []);

    if (events.length < 1) {
        return (<>
            <PageHero title={'event'}/>
            <h2>
                There is no public event now.
            </h2>
        </>)
    }

    return <main>
        <PageHero title={'join'}/>

        <h2>enter code</h2>

        <EventsList/>

    </main>;

}

export default Join
