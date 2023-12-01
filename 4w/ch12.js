const { reduce } = require("lodash");

nums = [4, 3, 2, 1];

const result = nums.reduce((acc, cur, idx) => acc + cur, 0);
// console.log(result);

// function min(numbers) {
//   return reduce(numbers, function (m, n) {
//     console.log(m);
//     if (m < n) return m;
//     else return n
//   }, Number.MAX_VALUE)
// };

// console.log(min(nums));

function min(numbers) {
  return numbers.reduce((acc, cur, idx) => {
    if (cur < acc) return cur;
    return acc;
  }, Number.MAX_SAFE_INTEGER)
};

function max(numbers) {
  return numbers.reduce((acc, cur, idx) => {
    if (cur > acc) return cur;
    return acc;
  }, Number.MIN_VALUE);
}

// console.log(min(nums));
// console.log(max(nums));

function map(arr, foo) {
  return arr.reduce((acc, cur) => {
    acc.push(foo(cur));
    return acc;
  }, []);
};

function filter(arr, foo) {
  return arr.reduce((acc, cur) => {
    if (foo(cur)) acc.push(cur);
    return acc;
  }, []);
}

console.log(map(nums, (num) => num * 2));
console.log(filter(nums, (num) => num % 2 === 0));