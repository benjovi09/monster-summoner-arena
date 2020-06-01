import React from 'react';
import { ProgressBar } from 'react-bootstrap';

export default function (props) {
    console.log(props);
    return (props.monsterIds.map(monsterId => {return <ProgressBar></ProgressBar>}));
}