/* 문제 1 */
function update_tax_dom() {
  set_tax_dom(shopping_cart_total * 0.1);
}

// 풀이
const shopping_cart_total = 100;

function update_tax_dom() {
  const new_tax = calculate_tax(shopping_cart_total);
  set_tax_total(new_tax);
}

function calculate_tax(total) {
  return total * 0.1;
}

/* 문제 2 */
function update_shipping_icons() {
  const buy_buttons = get_buy_buttons_dom();
  for (let i = 0; i < buy_buttons.length; i++) {
    const button = buy_buttons[i];
    const item = button.item;

    if (item.price + shopping_cart_total >= 20) {
      button.show_free_shipping_icon();
    } else {
      button.hide_free_shipping_icon();
    }
  }
}

// 풀이
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

function decide_shpping_icon(item_price, total) {
  return item_price + total >= 20;
}
