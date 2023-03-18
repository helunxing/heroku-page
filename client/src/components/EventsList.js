import React, {useEffect} from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";

import {useEventsContext} from "../contexts/events_context";

const EventsList = () => {

    const {events} = useEventsContext();

    useEffect(() => {
        document.title = 'Events';
    }, []);

    if (events.length < 1) {
        return (<>
                <h1>Home / About part</h1>
                <h2>
                    There is no event now.
                </h2>
            </>
        )
    }

    return <Wrapper>
        {events.map((event) => {
            const {id, title, date} = event
            return <article key={id}>
                <div>
                    <h4>{title}</h4>
                    <h5>{date}</h5>
                    <h5>your choice: 15</h5>
                    <Link to={`/join/${id}`} className='btn'>
                        join
                    </Link>
                </div>
            </article>;
        })}
    </Wrapper>

}

const Wrapper = styled.section`
  display: grid;
  row-gap: 1rem;
  justify-content: center;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  //grid-auto-columns: 3 max-content;

  h4 {
    //margin-bottom: 0.5rem;
  }

  p {
    max-width: 45em;
    //margin-bottom: 1rem;
  }

  .btn {
    font-size: 0.5rem;
    padding: 0.25rem 0.5rem;
    //margin-right: auto;
  }

  article {
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 1rem;
    align-items: center;
    padding-bottom: 1rem;
    padding-left: 1rem;
  }

  article::before {
    padding-left: 2rem;
  }

  @media (max-width: 1100px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (max-width: 720px) {
    grid-template-columns: 1fr 1fr;
  }
`

export default EventsList
