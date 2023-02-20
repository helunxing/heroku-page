import React, {useEffect, useState} from 'react'
import styled from "styled-components";

const Notfound = () => {

    return (<Wrapper>
        <div className={'title'}><h2>404 Not Found</h2></div>
    </Wrapper>);
}

const Wrapper = styled.section`
  .title {
    padding: 200px;
    height: 500px
  }
`

export default Notfound
