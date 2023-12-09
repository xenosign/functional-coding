// 슬라이더 요소 생성
const sizeSlider = document.createElement("input");
sizeSlider.type = "range";
sizeSlider.min = "10";
sizeSlider.max = "100";
sizeSlider.value = "50";

const rotationSlider = document.createElement("input");
rotationSlider.type = "range";
rotationSlider.min = "0";
rotationSlider.max = "360";
rotationSlider.value = "0";

// 슬라이더 이벤트 핸들러
sizeSlider.addEventListener("input", () => {
  const size = sizeSlider.value;
  const starElement = document.getElementById("star");
  starElement.style.width = `${size}px`;
  starElement.style.height = `${size}px`;
});

rotationSlider.addEventListener("input", () => {
  const rotation = rotationSlider.value;
  const starElement = document.getElementById("star");
  starElement.style.transform = `rotate(${rotation}deg)`;
});

// 슬라이더 요소 추가
document.body.appendChild(sizeSlider);
document.body.appendChild(rotationSlider);

// 별 모양 요소 생성
const starElement = document.createElement("div");
starElement.id = "star";
starElement.style.width = "50px";
starElement.style.height = "50px";
starElement.style.backgroundColor = "yellow";

// 별 모양 요소 추가
document.body.appendChild(starElement);
