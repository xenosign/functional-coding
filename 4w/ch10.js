function withLogging(foo) {
  foo();
}

withLogging(function () {
  console.log("노멀 함수", this);
});

withLogging(() => console.log("화살표 함수", this));
