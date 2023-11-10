/* 비지니스 요구 사항과 설계를 맞추기 */

// 요구사항 : 함계 금액과 제품 가격에 대한 무료 배송 여부 체크가 아닌, 주문 결과에 대한 무료 배송 여부 체크가 필요

// 액션 개선전 코드
function update_shipping_icons() {
  const buy_buttons = get_buy_buttons_dom();

  for (let i = 0; i < buy_buttons.length; i++) {
    const button = buy_buttons[i];
    const item = button.item;

    const factor = decide_shpping_icon(item.price, shopping_cart_total);
    if (factor) return button.show_free_shipping_icon();
    return button.hide_free_shipping_icon();
  }
}

// 인자가 주문 결과를 받는 것이 아니라, 이전 주문 금액 총액 - 해당 아이템 가격을 받음 -> 비지니스 요구 사항이랑 다름
function decide_shpping_icon(item_price, total) {
  // 주문 금액 총액 계산 방법이 2번 사용
  return item_price + total >= 20;
}

function calc_total(cart) {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    // 주문 금액 총액 계산 방법이 2번 사용
    total += item.price;
  }
  return total;
}

// 개선 후 코드
// 1. 인자 수정
// 2. 주문 금액 총액 계산 중복 방지

// 액션 개선전 코드
function update_shipping_icons() {
  const buy_buttons = get_buy_buttons_dom();

  for (let i = 0; i < buy_buttons.length; i++) {
    const button = buy_buttons[i];
    const item = button.item;

    // 주문 결과를 계산하여 cart 인자로 전달하자
    const new_cart = add_item(shopping_cart, { price: item.price, name: item.name })

    const factor = decide_shpping_icon(new_cart);
    if (factor) return button.show_free_shipping_icon();
    return button.hide_free_shipping_icon();
  }
}

// 인자를 주문 결과만 받아오자
function decide_shpping_icon(cart) {
  // 합계를 내는 함수를 재사용하여 중복 방지, 코드 스멜 제거
  return calc_total(cart) >= 20;
}

function calc_total(cart) {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    total += item.price;
  }
  return total;
}


/* 데이터에 따른 함수 나누기 */

// 기존 코드
function add_item(cart, name, price) {
  const new_cart = cart.slice();
  new_cart.push({
    name: name,
    price: price,
  })
  return new_cart;
}

add_item(shopping_cart, "shoes", 3.45);


// 수정 코드
function make_cart_item(name, price) {
  return {
    name: name,
    price: price,
  }
}

function add_item(cart, item) {
  const new_cart = cart.slice();
  new_cart.push(item);

  return new_cart;
}

add_item(shopping_cart, make_cart_item("shoes", 3.45));

/* 카피 온 라이트 패턴 빼기 */

// 기존 코드
function add_item(cart, item) {
  const new_cart = cart.slice();
  new_cart.push(item);

  return new_cart;
}

// 수정 코드

// 특수성을 가진 함수를 빼내서 일반적으로 사용할 수 있는 함수로 세분화
function add_element_last(arr, el) {
  // 값을 카피해서 전역 변수에 영향을 안미치도록 하기
  const new_arr = arr.slice();
  new_arr.push(el);
  return new_arr;
}

function add_item(cart, item) {
  return add_element_last(cart, item);
}

// => 결과
// add_item 은 3가지 인자를 받아서 처리 했지만 이제는 make_cart_item 이 아이템을 만들어 줌으로 2개의 인자로 처리 가능