// function update_tax_dom() {
//   set_tax_dom(shopping_cart_total* 0.1);
// };

// 풀이
function update_tax_dom(cart_total) {
  const new_tax = calculate_tax(cart_total);
  set_tax_total(new_tax);
}

function calculate_tax(total) {
  return total * 0.1;
}