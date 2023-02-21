import React, {useEffect} from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";

import {useEventsContext} from "../contexts/events_context";
import EventsList from "../components/EventsList";
import PageHero from "../components/PageHero";

const Join = () => {

    const {events} = useEventsContext();

    useEffect(() => {
        document.title = 'Join';
    }, []);

    return <main>
        <PageHero title={'join'}/>

        <h2>enter code</h2>

        <EventsList/>

    </main>;

}

export default Join
