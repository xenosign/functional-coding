import React from 'react';
import { useState } from 'react';

// 함수로 만듦으로서 재사용성 강화
function random() {
  return Math.ceil(Math.random() * 10);
}

export default function ActionSeperation() {
  const [randNum, setRandNum] = useState(0);

  const handleRandomNum = () => {
    // 실행 시점에 따라 결정 되는 부분이므로, 액션 -> 따로 함수화
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
