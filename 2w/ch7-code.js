const _ = require("lodash");

// 얕은 복사
const array_sc = ["사과", "포도", "바나나"];
const temp_sc = {
  name: "",
};

temp_sc.name = "망고";
array_sc.push(temp_sc);
console.log(temp_sc);
temp_sc.name = "딸기";

array_sc.push(temp_sc);

console.log("얕은 복사(Swallow Copy) : ", array_sc);

// 깊은 복사
var array_dc = ["사과", "포도", "바나나"];
var temp_dc = {
  name: "",
};

temp_dc.name = "망고";
array_dc.push(_.cloneDeep(temp_dc));
temp_dc.name = "딸기";
array_dc.push(_.cloneDeep(temp_dc));

console.log("깊은 복사(Deeply copy) : ", array_dc);
