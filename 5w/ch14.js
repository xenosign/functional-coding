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

const cartObj = {
  shirts: {
    options: {
      size: 100,
    },
  },
};

console.log(incrementSizeByName(cartObj, "shirts"));

const user = {
  fisrtName: "Joe",
  lastName: "Nash",
  email: "JOE@EXAMPLE>COM",
};

console.log(update(user, "email", (email) => email.toLowerCase()));

const item = {
  name: "shoes",
  price: 7,
  quantity: 2,
};

function tenXQuantity(item) {
  return update(item, "quantity", (value) => value * 10);
}

console.log(tenXQuantity(item));
