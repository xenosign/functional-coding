import { useState } from 'react';

const max = 10;

export default function ActionSeperation() {
  const [randNum, setRandNum] = useState(0);

  const handleRandNum = () => {
    const nextRandNum = Math.ceil(Math.random() * max);
    setRandNum(nextRandNum);
  }

  return (
    <div>
      <button onClick={handleRandNum}>랜덤 수 생성!</button>
      <h1>{randNum}</h1>
    </div>
  )
}
