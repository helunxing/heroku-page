import React, {useEffect} from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";
import {useUtilContext} from "../contexts/util_context";

// import { useNavigate } from "react-router-dom";

function UserButton() {

    const {isLogged, closeSidebar,getUserStatus} = useUtilContext()
    const refreshPage = () => {
        closeSidebar()
        // Hope one day I have the ability to replace this solution with a more elegant solution.
        // Ask this problem in stack overflow
        setTimeout(
            () => {
                window.location.reload(false);
            }, 200
        )
    }

    useEffect(() => {
        getUserStatus();
    }, [])

    return (<Wrapper className='user-btn-wrapper'>
        {isLogged ? (
            <>
                <Link to='/me' className='btn user-btn' onClick={refreshPage}>
                    DashBoard</Link>
                <Link to='/logout' className='btn logout-btn' onClick={refreshPage}>
                    Log out </Link></>) : (
            <Link to='/login' className='btn log-btn' onClick={refreshPage}>
                Login</Link>
        )}

    </Wrapper>);
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 225px;

  .user-btn {
    border-radius: 25px;
    //border: 2px solid var(--clr-grey-1);
    padding: 20px;
    width: 135px;
    height: 15px;
    //color: var(--clr-grey-1);
    letter-spacing: var(--spacing);
    display: flex;
    background: var(--clr-primary-5);
    //overflow: auto;
    //font-size: 1.5rem;
    align-items: center;
  }

  .log-btn {
    border-radius: 25px;
    padding: 20px;
    width: 90px;
    height: 15px;
    letter-spacing: var(--spacing);
    display: flex;
    background: var(--clr-primary-5);
    align-items: center;
  }

  .cart-container {
    display: flex;
    align-items: center;
    position: relative;

    svg {
      height: 1.6rem;
      margin-left: 5px;
    }
  }

  .cart-value {
    position: absolute;
    top: -10px;
    right: -16px;
    background: var(--clr-primary-5);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    color: var(--clr-white);
    padding: 12px;
  }

  .logout-btn {

    border-radius: 25px;
    border: 2px solid var(--clr-grey-1);

    padding: 20px;
    width: 120px;
    height: 15px;

    margin-left: 11px;

    display: flex;
    align-items: center;
    background: transparent;
    //border-color: transparent;
    cursor: pointer;
    color: var(--clr-grey-1);
    letter-spacing: var(--spacing);

    svg {
      margin-left: 5px;
    }
  }
`

export default UserButton

