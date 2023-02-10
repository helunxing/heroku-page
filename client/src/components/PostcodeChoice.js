import React, {useState} from 'react';

const PostcodeChoice = ({dataList}) => {

    // fetch('/postcode/gxpoigeeg')
    //     .then((res) => res.json())
    //     .then((data) => setDate(data));

    // const res = await fetch('/status');
    // const status_json = await res.json();

    const [choice, setChoice] = useState('');

    if (dataList === null) {
        return <>
            <h2>Loading</h2>
        </>
    }

    if (dataList === '') {
        return
    }

    const choiceList = Object.keys(dataList).sort()

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
        {!choice || <PostcodeChoice dataList={dataList[choice]}/>}
    </>);
};

export default PostcodeChoice;
