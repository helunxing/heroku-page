import React, {useEffect} from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";

import {useEventsContext} from "../contexts/events_context";
import PageHero from "../components/PageHero";

const Event = () => {

    const {events} = useEventsContext();

    useEffect(() => {
        document.title = 'Events';
    }, []);

    if (events.length < 1) {
        return (<>
                <PageHero title={'event'}/>
                <h2>
                    There is no event now.
                </h2>
            </>
        )
    }

    return <main>
        <PageHero title={'event'}/>
        <h1>Create Event</h1>
    </main>;

}

const Wrapper = styled.section`
  display: grid;
  row-gap: 1rem;
  justify-content: center;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  //grid-auto-columns: 3 max-content;

  h4 {
    margin-bottom: 0.5rem;
  }

  p {
    max-width: 45em;
    margin-bottom: 1rem;
  }

  .price {
    color: var(--clr-primary-6);
    margin-bottom: 0.75rem;
  }

  .btn {
    font-size: 0.5rem;
    padding: 0.25rem 0.5rem;
    margin-right: auto;
  }

  article {
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 1rem;
    align-items: center;
    margin-bottom: 1rem;
    margin-left: 1rem;
  }
  
  article::before{
    padding-left: 2rem;
  }
  
  @media(max-width: 1100px){
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media(max-width: 720px){
    grid-template-columns: 1fr 1fr;
  }

  //@media (min-width: 992px) {
  //}
`

export default Event
