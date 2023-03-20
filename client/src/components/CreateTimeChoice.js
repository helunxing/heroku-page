import TextField from "@mui/material/TextField";
import {AiOutlineDelete, AiOutlinePlus} from "react-icons/ai";
import React, {useState} from "react";
import moment from "moment";

import {useEventsContext} from "../contexts/events_context";
import styled from "styled-components";

const CreateTimeChoice = ({idx, option, createNew}) => {

    const {handleTimeChange} = useEventsContext();

    return (
        <Wrapper>
            <div className={"timeChoice"} >
                <TextField
                    id="startTime"
                    label="Start time"
                    type="time"
                    value={option.startTime}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(e) => {
                        handleTimeChange(e, idx, "startTime")
                    }}
                    inputProps={{
                        step: 300, // 5 min
                    }}
                    sx={{width: 105}}
                />

                <TextField
                    id="endTime"
                    label="End time"
                    className={'endTime'}
                    type="time"
                    value={option.endTime}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(e) => {
                        handleTimeChange(e, idx, "endTime")
                    }}
                    inputProps={{
                        step: 300,
                    }}
                    sx={{width: 105}}
                />

                {createNew ?
                    <button type={'button'}
                            onClick={(e) => {
                                handleTimeChange(e, idx, "delete")
                            }
                            }>
                        <AiOutlineDelete size={50}/>
                    </button> :
                    <button type={'button'}
                            onClick={(e) => {
                                handleTimeChange(e, idx, "add")
                            }}>
                        <AiOutlinePlus size={50}/>
                    </button>}

            </div>
        </Wrapper>)
}

const Wrapper = styled.section`

  button {
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 1rem;
  }

  .timeChoice {
    padding-top: 1.5rem;
    //padding-bottom: 1rem;
    margin-left: 4rem;
    justify-content: center;
    display: flex;
  }

  .endTime {
    margin-left: 0.5rem;
  }
`

export default CreateTimeChoice;
