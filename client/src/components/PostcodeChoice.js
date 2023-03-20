import React, {useState} from 'react';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import styled from "styled-components";

const PostcodeChoice = ({dataList, level}) => {

    const [choice, setChoice] = useState('');

    if (dataList === null) {
        return
    }

    if (dataList === "loading...") {
        return <div className={"eventInfo"}>
            <h3>Loading</h3>
        </div>
    }

    const choiceList = Object.keys(dataList).sort()

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
                        setChoice(e.target.value)
                    }}
                >
                    {choiceList.length < 1 || <MenuItem value="">[empty]</MenuItem>}
                    {choiceList.map((choice, index) => {
                        return <MenuItem value={choice}>{choice}</MenuItem>
                    })}
                </Select>
            </FormControl>
        </div>
        {choice === '' || <PostcodeChoice dataList={dataList[choice]}/>}
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
