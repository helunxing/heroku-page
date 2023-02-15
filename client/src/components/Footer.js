import React from 'react'
import styled from 'styled-components'

const Footer = () => {
    return (

        <Container>
            <div>
                <h5>hlx work</h5>
            </div>
        </Container>

    )
}

const Container = styled.footer`
  background: var(--clr-grey-10);
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  div::before {
    margin-left: 10px;
    content: "";
    display: table;
  }

  //span {
  //  color: var(--clr-primary-5);
  //}

  h5 {
    //color: var(--clr-white);
    margin: 0.1rem;

    font-weight: 400;
    text-transform: none;
    line-height: 1.25;
  }

  @media (min-width: 776px) {
    flex-direction: row;
  }
`

export default Footer
