import { useState } from 'react';

export default function ActionSeperation() {
  const [randNum, setRandNum] = useState(0);

  const handleRandNum = () => {
    const nextRandNum = Math.ceil(Math.random() * 10);
    setRandNum(nextRandNum);
  }

  return (
    <div>
      <button onClick={handleRandNum}>랜덤 수 생성!</button>
      <h1>{randNum}</h1>
    </div>
  )
}
