import styled from "styled-components";
import {Link} from "react-router-dom";
import pic1 from "../assets/meeting1.jpg"
import pic2 from "../assets/meeting2.jpg"

const IntroContent = () => {
    return <Wrapper className='section-center'>

        <article className='content'>
            <h1>
                context <br/>
                context
            </h1>
            <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, at
                sed omnis corporis doloremque possimus velit! Repudiandae nisi odit,
                aperiam odio ducimus, obcaecati libero et quia tempora excepturi quis
                alias?
            </p>
            <Link to='/events' className='btn hero-btn'>
                create event
            </Link>
        </article>

        <article className='img-container'>
            <img src={pic2} alt='nice table' className='main-img'/>
        </article>

        <article className='img-container'>
            <img src={pic1} alt='nice table' className='main-img'/>
        </article>

        <article className='content'>
            <h1>
                context <br/>
                context
            </h1>
            <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, at
                sed omnis corporis doloremque possimus velit! Repudiandae nisi odit,
                aperiam odio ducimus, obcaecati libero et quia tempora excepturi quis
                alias?
            </p>
            <Link to='/about' className='btn hero-btn'>
                join event
            </Link>
        </article>

    </Wrapper>;
}

const Wrapper = styled.section`
  min-height: 60vh;
  display: grid;
  place-items: center;

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

export default IntroContent
