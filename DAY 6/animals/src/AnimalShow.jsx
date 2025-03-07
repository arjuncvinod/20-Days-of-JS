import React, { useState } from 'react'
import bird from './svg/bird.svg';
import cat from './svg/cat.svg';
import cow from './svg/cow.svg';
import dog from './svg/dog.svg';
import gator from './svg/gator.svg';
import heart from './svg/heart.svg';
import horse from './svg/horse.svg';


export default function AnimalShow({ animal }) {
    const [size, setSize] = useState(10)
    const svgMap = { cat, dog, bird, cow, gator, heart, horse }
    const handleclick = () => {
        setSize(size+10)
    }
    return (
        <>
        <img src={svgMap[animal]} alt="" style={{width:"100px"}} onClick={handleclick} />
        <img src={heart} alt="" style={{width:size+'px'}} />
        </>
    )
}
