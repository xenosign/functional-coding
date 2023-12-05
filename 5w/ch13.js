const { reduce, forEach } = require("lodash");

const arr = [1, 2, 3, 4];
const objArr = [{ total: 1 }, { total: 2 }, { total: 3 }, { total: 4 }];

// 수업 코드와 비슷하게 맞추기 위해 Lodash reduce 함수 사용, 인자 순서 다름
function maxKey(arr, init, foo) {
  return reduce(
    arr,
    function (max, el) {
      if (foo(max) > foo(el)) return max;
      return el;
    },
    init
  );
}

function max(arr, init) {
  return maxKey(arr, init, function (x) {
    return x;
  });
}

// JS reduce 이용 버전
function maxKeyJS(arr, init, foo) {
  return arr.reduce((acc, cur) => {
    if (foo(acc) > foo(cur)) return acc;
    return cur;
  }, init);
}

function maxJS(arr, init) {
  return maxKeyJS(arr, init, (x) => x);
}

console.log("Lodash max", max(arr, 0));
console.log("JS max", maxJS(arr, 0));

// 객체 결과
const MIN = { total: 0 };
console.log(
  "Lodash maxKey",
  maxKey(objArr, MIN, (el) => el.total)
);
console.log(
  "JS maxKey",
  maxKeyJS(objArr, MIN, (el) => el.total)
);

// 연습문제 2
function bigSpenders(customers) {
  const over100Customers = filter(customers, isOverHundred);
  const over100andPurchaseTwice = filter(over100Customers, isPurchaseMoreTwice);
  return over100andPurchaseTwice;
}

function isOverHundred(customer) {
  return customer.total >= 100;
}

function isPurchaseMoreTwice(customer) {
  return customer.purchases >= 2;
}

// 연습문제 3
function average(numbers) {
  return numbers.reduce((acc, cur) => acc + cur, 0) / numbers.length;
}

function concat(arrs) {
  const ret = [];
  forEach(arrs, function (arr) {
    forEach(arr, function (el) {
      ret.push(el);
    });
  });
  return ret;
}

console.log(
  concat([
    [1, 2, 3, 4],
    [1, 2, 3, 4],
    [1, 2, 3, 4],
  ])
);

const testObj = {};

const position = "pitcher";

testObj[position] = "Tetz";

console.log(testObj);

const em = ["jane", "tom"];

function recommendPosition(name) {
  if (name === "jane") return "pitcher";
  return "catcher";
}

const recommendations = em.reduce((acc, cur, idx) => {
  acc.push({ name: cur, position: recommendPosition(cur) });
  return acc;
}, []);

console.log(recommendations);

const newObj = { ...testObj, scroe: 0 };
console.log(newObj);
