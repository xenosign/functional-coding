// 이 코드는 주어진 객체의 특정 값을 수정하는 두 개의 함수와, 주어진 경로를 따라 객체의 값을 수정하는
// 함수로 구성되어 있습니다.

// 좋은 점:
// 1. `update` 함수는 객체를 복사하여 새로운 객체를 생성하고, 해당 객체의 특정 값을 수정하는 기능을 가지고
// 있습니다. 이를 통해 원본 객체를 변경하지 않고도 안전하게 값을 수정할 수 있습니다.

// 2. `nestedUpdate` 함수는 재귀적으로 호출되어 객체의 중첩된 값을 수정할 수 있습니다.
// 이를 통해 복잡한 객체 구조에서도 효과적으로 값을 수정할 수 있습니다.

// 3. `incrementSizeByName` 함수는 `nestedUpdate` 함수를 활용하여 주어진 경로에 해당하는 값을 1 증가시키는
// 기능을 가지고 있습니다. 이를 통해 코드의 가독성과 재사용성이 높아집니다.

// 나쁜 점:
// 1. `nestedUpdate` 함수에서 `keys` 배열을 수정하고 있습니다. `shift` 메소드를 사용하여 첫 번째 요소를
// 제거하고 가져오는 동작은 원본 배열을 변경시키기 때문에, 함수 외부에서 `keys` 배열을 사용하는 경우 예상치
// 못한 동작이 발생할 수 있습니다. 이를 방지하기 위해서는 `keys` 배열을 복사하여 사용하는 것이 좋습니다.

// 2. `nestedUpdate` 함수에서는 경로에 해당하는 값이 존재하지 않는 경우에 대한 예외 처리가 없습니다.
// 이 경우에는 `TypeError`가 발생할 수 있으므로, 해당 예외를 처리하는 로직을 추가하는 것이 좋습니다.

function update(obj, key, modify) {
  const newObj = Object.assign({}, obj);
  const value = newObj[key];
  newObj[key] = modify(value);
  return newObj;
}

function nestedUpdate(obj, keys, modify) {
  if (keys.length === 0) return modify(obj);

  const key1 = keys.shift();
  return update(obj, key1, function (value) {
    return nestedUpdate(value, keys, modify);
  });
}

function incrementSizeByName(cart, name) {
  return nestedUpdate(cart, [name, "options", "size"], (size) => size + 1);
}

// 객체를 깊은 복사해서, 새로 만든 객체를 변경하는 함수.
function deepCopyAndModify(obj, key, value) {
  // 객체를 깊은 복사하여 새로운 객체 생성
  const newObj = JSON.parse(JSON.stringify(obj));

  // 새로운 객체의 특정 키에 값을 변경
  newObj[key] = value;

  // 변경된 객체 반환
  return newObj;
}
