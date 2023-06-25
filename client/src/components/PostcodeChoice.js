import React, {useEffect, useState} from 'react';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import styled from "styled-components";
import {useEventsContext} from "../contexts/events_context";
import userButton from "./UserButton";

const PostcodeChoice = ({dataList, level}) => {

    const [choice, setChoice] = useState("");

    const {
        setPostcodeData,
    } = useEventsContext()

    useEffect(() => {
        setChoice("");
    }, [dataList])

    if (dataList === undefined || dataList === null) {
        return
    }

    if (dataList === "loading...") {
        return <div className={"eventInfo"}>
            <h3>Loading</h3>
        </div>
    }

    const choiceList = Object.keys(dataList).sort()
    const nextLevel = level + 1

    return <Wrapper>
        <div className={"eventInfo"}>
            <FormControl>
                {/*sx={{m: 1, minWidth: 120}}*/}
                <Select
                    displayEmpty
                    inputProps={{'aria-label': 'Without label'}}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={choice}
                    onChange={(e) => {
                        setPostcodeData(level, e.target.value)
                        setChoice(e.target.value)
                    }}
                >
                    {choiceList.length < 1 || <MenuItem key={-1} value="">[empty]</MenuItem>}
                    {choiceList.map((choice, index) => {
                        return <MenuItem key={index} value={choice}>{choice}</MenuItem>
                    })}
                </Select>
            </FormControl>
        </div>
        {choice === '' || <PostcodeChoice dataList={dataList[choice]} key={nextLevel} level={nextLevel}/>}
    </Wrapper>
};

const Wrapper = styled.section`
  .eventInfo {
    padding-top: 1rem;
    justify-content: center;
    display: flex;
  }
`

export default PostcodeChoice;
