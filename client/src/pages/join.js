import React, {useEffect} from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";

import {useEventsContext} from "../contexts/events_context";
import EventsList from "../components/EventsList";
import PageHero from "../components/PageHero";
import {useUtilContext} from "../contexts/util_context";
import {base_url} from "../utils/constants";

const Join = () => {

    const {logged} = useUtilContext()

    const {events, fetchEvents} = useEventsContext();

    useEffect(() => {
        // if(!logged){
        //     window.location.href = base_url + '/login'
        // }
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

        <EventsList/>

    </main>;

}

export default Join
