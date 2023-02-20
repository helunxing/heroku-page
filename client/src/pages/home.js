import React, {useEffect} from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";
import pic1 from "../assets/meeting1.jpg"
import pic2 from "../assets/meeting2.jpg"

const Home = () => {

    useEffect(() => {
        document.title = 'Time Agreement';
    }, []);

    return <main>
        <Wrapper className='section-center'>

            <article className='content'>
                <h1>
                    invite <br/>
                    friends
                </h1>
                <p>
                    Not sure when your friends are available for a meeting?
                    Let Time Agreement help you find the best time to get together.
                </p>
                <Link to='/events' className='btn hero-btn'>
                    host event
                </Link>
            </article>

            <article className='img-container'>
                <img src={pic2} alt='meeting2' className='main-img'/>
            </article>

            <article className='img-container'>
                <img src={pic1} alt='meeting1' className='main-img'/>
            </article>

            <article className='content'>
                <h1>
                    choose time <br/>
                    you like
                </h1>
                <p>
                    Want to keep track of all your events and never miss one again?
                    Time Agreement can help you manage them all.
                </p>
                <Link to='/join' className='btn hero-btn'>
                    join event
                </Link>
            </article>

        </Wrapper>
    </main>;

}

const Wrapper = styled.section`

  min-height: 60vh;
  display: grid;
  place-items: center;
  overflow: auto;

  .img-container {
    display: none;
  }

  p {
    line-height: 2;
    max-width: 45em;
    margin-bottom: 2rem;
    color: var(--clr-grey-5);
    font-size: 1rem;
  }

  @media (min-width: 992px) {


    height: calc(100vh - 5rem);
    grid-template-columns: 1fr 1fr;
    gap: 8rem;
    h1 {
      margin-bottom: 2rem;
    }

    p {
      font-size: 1.25rem;
    }

    .hero-btn {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
    }

    .img-container {
      display: block;
      position: relative;
    }

    .main-img {
      width: 100%;
      height: 350px;
      position: relative;
      border-radius: var(--radius);
      display: block;
      object-fit: cover;
    }

    .accent-img {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 250px;
      transform: translateX(-50%);
      border-radius: var(--radius);
    }

    .img-container::before {
      content: '';
      position: absolute;
      width: 10%;
      height: 80%;
      //background: var(--clr-primary-9);
      bottom: 0%;
      left: -8%;
      border-radius: var(--radius);
    }
  }
`

export default Home
