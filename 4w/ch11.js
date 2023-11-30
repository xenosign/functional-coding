function saveUserData(user) {
  console.log("USER", user);
  throw "err";
}

function logToSnapErr(err) {
  console.log("ERR", err);
}

function wrapLogging(func) {
  return function (arg) {
    try {
      console.log("arg", arg);
      return func(arg);
    } catch (err) {
      logToSnapErr(err);
    }
  };
}

const saveUserDataWithLog = wrapLogging(saveUserData);
saveUserDataWithLog("lhs");

let inc = makeAdder(1);

function makeAdder(n) {
  return function (x) {
    return n + x;
  };
}

const result = inc(10);

console.log(result);

function makeErr(a1, a2, a3) {
  console.log(...arguments);
  throw "err";
}

function wrapIgnoreErr(func) {
  return function (a1, a2, a3) {
    try {
      return func(a1, a2, a3);
    } catch (err) {
      return null;
    }
  };
}

const ignoreFunc = wrapIgnoreErr(makeErr);

ignoreFunc(1, 2, 3);

// 연습
function writeConsole(test, arg1, arg2, arg3) {
  console.log(...arguments);
}

function wrapFunc(func) {
  return function (test, a1, a2, a3) {
    if (test) {
      func(...arguments);
    } else {
      console.log("ELSE");
    }
  };
}

const wrapped = wrapFunc(writeConsole);
wrapped(false, 1, 2, 3);
