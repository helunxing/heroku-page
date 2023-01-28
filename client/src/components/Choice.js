import React, {useState} from 'react';

const Choice = ({dataList}) => {
    const [choice, setChoice] = useState('');

    if (dataList === null) {
        return <>
            <h2>Loading</h2>
        </>
    }

    if (dataList === '') {
        return
    }

    const choiceList = allChoice(dataList).sort()

    return (<>
        {/*<label>address select</label>*/}
        <select onChange={(e) => {
            setChoice(e.target.value)
        }}>
            {choiceList.length < 2 || <option value={''}>[empty]</option>}
            {choiceList.map((choice, index) => {
                return <option value={choice}>{choice}</option>
            })}
        </select>
        {!choice || <Choice dataList={dataList[choice]}/>}
    </>);
};

const allChoice = (curr) => {
    return Object.keys(curr)
    // .map((key) => console.log(curr[key]))
}

export default Choice;
