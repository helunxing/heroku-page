import React from 'react'
import styled from 'styled-components'
import {Link, useParams} from 'react-router-dom'

const PageHero = ({title, isEvent}) => {

    const {id} = useParams();

    return (
        <Wrapper>
            <div className='section-center'>
                <h3>
                    <Link to='/'>Home</Link>
                    {isEvent &&<Link to='/join'>/ Join</Link>}/ {title}
                </h3>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`
  background: var(--clr-primary-10);
  width: 100%;
  min-height: 10vh;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  color: var(--clr-primary-1);

  a {
    color: var(--clr-primary-3);
    padding: 0.5rem;
    transition: var(--transition);
  }

  a:hover {
    color: var(--clr-primary-1);
  }
`

export default PageHero
