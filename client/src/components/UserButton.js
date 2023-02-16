import React from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";
// import { useNavigate } from "react-router-dom";

function UserButton() {
    const refreshPage = () => {
        // Hope one day I have the ability to replace this solution with a more elegant solution.
        setTimeout(
            ()=>{window.location.reload(false);},400
        )
    }

    return (<Wrapper className='user-btn-wrapper'>
        <Link to='/login' className='btn user-btn' onClick={refreshPage}>
            DashBoard
        </Link>
        <></>
        <Link to='/logout' className='btn logout-btn' onClick={refreshPage}>
            Log out
        </Link>
        {/*{myUser ? (*/}
        {/*    <button*/}
        {/*        type='button'*/}
        {/*        className='auth-btn'*/}
        {/*        onClick={() => {*/}
        {/*            clearCart()*/}
        {/*            localStorage.removeItem('user')*/}
        {/*            logout({ returnTo: window.location.origin })*/}
        {/*        }}*/}
        {/*    >*/}
        {/*        Logout <FaUserMinus />*/}
        {/*    </button>*/}
        {/*) : (*/}
        {/*    <button type='button' className='auth-btn' onClick={loginWithRedirect}>*/}
        {/*        Login <FaUserPlus />*/}
        {/*    </button>*/}
        {/*)}*/}
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

