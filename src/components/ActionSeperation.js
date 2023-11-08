import React from 'react';
import { useState } from 'react';

function random() {
  return Math.ceil(Math.random() * 10);
}

export default function ActionSeperation() {
  const [randNum, setRandNum] = useState(0);

  const handleRandomNum = () => {
    const nextRandNum = random();
    setRandNum(nextRandNum);
  }

  return (
    <>
      <button onClick={handleRandomNum}>랜덤 수 생성</button>
      <h1>{randNum}</h1>
    </>
  )
}
