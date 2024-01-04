function Cut(num, cb) {
  let num_finished = 0;
  return function () {
    num_finished += 1;
    if (num_finished === num) cb();
  };
}

// 예제
const done = Cut(3, () => console.log("3 timelines are finished"));

done();
done();
// done();