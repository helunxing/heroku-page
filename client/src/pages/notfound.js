import React, {useEffect, useState} from 'react'
import styled from "styled-components";

const Notfound = () => {

    const [info, setInfo] = useState('Loading...');

    useEffect(() => {
        setTimeout(
            () => {
                setInfo('404 Not Found')
            }, 400)
    }, [])

    return (<Wrapper>
        <div className={'title'}><h2>{info}</h2></div>
    </Wrapper>);
}

const Wrapper = styled.section`
  .title {
    padding: 200px;
    height: 500px
  }
`

export default Notfound
