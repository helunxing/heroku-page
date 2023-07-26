import PageHero from "../components/PageHero";
import React, {useEffect} from "react";
import {useUtilContext} from "../contexts/util_context";

const Me = () => {
    const {name,logged} = useUtilContext()
    useEffect(() => {
        // if(!logged){
        //     window.location.href = '/login'
        // }
        document.title = 'Me';
    }, [])
    return (<>
        <PageHero title={'me'}/>
        <h2>{name?name:'no name'}</h2>
    </>);
}

export default Me;
