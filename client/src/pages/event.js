import React, {useEffect, useState} from 'react';
import moment from "moment/moment";
import styled from "styled-components";
import {AiOutlinePlus, AiOutlineDelete} from 'react-icons/ai';
import {MobileDatePicker} from '@mui/x-date-pickers';
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";

import PageHero from "../components/PageHero";
import {useEventsContext} from "../contexts/events_context";
import CreateTimeChoice from "../components/CreateTimeChoice";


const Event = () => {

    const {
        handleDetailChange,
        resetEvent,
        new_event,
        showAll
    } = useEventsContext()

    const {
        title,
        chosenDate,
        postcode,
        options,
    } = new_event;


    useEffect(() => {
        document.title = 'Events';
        resetEvent();
    }, []);

    return <Wrapper>
        <PageHero title={'event'}/>

        <div className={'eventInput'}>
            <div className={"eventInfo"}>
                <TextField id="title" label="Event title" variant="outlined"
                           value={title}
                           onChange={handleDetailChange}
                           error={false}
                           helperText={true ? '' : {/*"please enter the title"*/}}
                />
            </div>

            <div className={"eventInfo"}>
                <MobileDatePicker
                    value={chosenDate}
                    onChange={handleDetailChange}
                    label="Date"
                    inputFormat="DD/MM/YYYY"
                    renderInput={(params) => <TextField {...params} />}
                />
            </div>

            <div className={"eventInfo"}>
                <TextField id="postcode"
                           value={postcode}
                           className={"postcode"}
                           label="Postcode"
                           variant="outlined"
                           onChange={handleDetailChange}/>
                <Button>
                    search</Button>
            </div>

            {options.map((option, index) => {
                return <CreateTimeChoice key={index}
                                         idx={index}
                                         option={option}
                                         createNew={index !== 0}/>
            })}

            <div className={"buttons"}>
                <Button variant="contained" onClick={showAll}>Submit</Button>
                <Button variant="outlined" onClick={resetEvent}>Reset</Button>
            </div>

        </div>

    </Wrapper>;

}

const Wrapper = styled.section`

  button {
    margin-left: 0.5rem;
  }

  .buttons {
    padding-right: 0.6rem;
    padding-top: 1rem;
    justify-content: center;
    display: flex;
  }

  .eventInput {
    padding-bottom: 1.5rem;
  }

  .postcode {
    margin-left: 5.3rem;
  }

  .eventInfo {
    padding-top: 1rem;
    justify-content: center;
    display: flex;
  }
`

export default Event;
