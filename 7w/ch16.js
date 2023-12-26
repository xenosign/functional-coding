// 기존 코드
function add_item_to_cart(item) {
  cart = add_item(cart, item);
  calc_cart_total(cart, update_total_dom);
};

function calc_cart_total(cart, cb) {
  let total = 0;
  cost_ajax(cart, function (cost) {
    total += cost;
    shipping_ajax(cart, function (shipping) {
      total += shipping;
      cb(total)
    })
  })
};

// 큐 적용 코드
function add_item_to_cart(item) {
  cart = add_item(cart, item);
  update_total_queue(cart);
};

function calc_cart_total(cart, cb) {
  let total = 0;
  cost_ajax(cart, function (cost) {
    total += cost;
    shipping_ajax(cart, function (shipping) {
      total += shipping;
      cb(total)
    })
  })
};

const queue_items = [];
let working = false;

function runNext() {
  if (working) return;

  if (queue_items.length === 0) return;

  working = true;
  const cart = queue_items.shift();
  calc_cart_total(cart, function (total) {
    update_total_dom(total);
    working = false;
    // 재귀
    runNext();
  });
}

function update_total_queue(cart) {
  queue_items.push(cart);
  setTimeout(runNext, 0);
}

// 큐를 Queue() 라는 함수에 넣은 코드
// * 전역 변수를 지역 변수화
// * 실행 함수를 지역 함수화
function Queue() {
  const queue_items = [];
  let working = false;

  function runNext() {
    if (working) return;

    if (queue_items.length === 0) return;

    working = true;
    const cart = queue_items.shift();
    calc_cart_total(cart, function (total) {
      update_total_dom(total);
      working = false;
      // 재귀
      runNext();
    });
  }

  return function (cart) {
    queue_items.push(cart);
    setTimeout(runNext, 0);
  }
}

const update_total_queue = Queue();