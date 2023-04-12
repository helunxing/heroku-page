import PageHero from "../components/PageHero";
import React from "react";
import {useUtilContext} from "../contexts/util_context";

const Me = () => {
    const {name} = useUtilContext()
    return (<>
        <PageHero title={'me'}/>
        <h2>{name?name:'no name'}</h2>
    </>);
}

export default Me;
