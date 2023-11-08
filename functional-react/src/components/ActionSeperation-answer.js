import { useState } from 'react';

function random(max) {
  return Math.ceil(Math.random() * max);
}

export default function ActionSeperation() {
  const [randNum, setRandNum] = useState(0);

  const max = 10;

  const handleRandNum = () => {
    const nextRandNum = random(max);
    setRandNum(nextRandNum);
  }

  return (
    <div>
      <button onClick={handleRandNum}>랜덤 수 생성!</button>
      <h1>{randNum}</h1>
    </div>
  )
}
