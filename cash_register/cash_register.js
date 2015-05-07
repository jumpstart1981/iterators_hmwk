var line_items = [
    {description: "aardvark", price: 425, qty: -1},
    {description: "PruNe", price: 1.99, qty: 1},
    {description: "potato", price: .79, qty: -10},
    {description: "zebra", price: 525.25, qty: 1},
    {description: "SpinAch", price: 2.99, qty: 1},
    {description: "zepplin", price: 20000, qty: 1},
    {description: "PetUnia", price: 1.25, qty: 12},
    {description: "squash", price: 2.35, qty: 3}
];

var coupons = [
    {description: "Zebra", discount: 100, limit: 1},
    {description: "squash", discount: 1.00, limit: 1},
    {description: "mouse", discount: 2.00, limit: 10}
];

var $entries, 
    $subTotal;

$(document).ready(function(){

   $entries = $("#entries");
   $subTotal = $('#subtotal');

  myUtils.myEach(line_items, function(v,i){
    addItem(v.price, v.description.toLowerCase(), v.qty);
  });

  updateSubTotal();


});

function addItem(price, title, quantity) {
  // YUCK! Let's refactor this!
  var html_string = (
        "<tr>" +
          "<td>" +  title + "</td>" +
          "<td>" + quantity + "</td>" +
          "<td>" + price + "</td>" +
        "</tr>"
  );
  $entries.append(html_string);
}

function updateSubTotal() {
  var subTotalPrice = myUtils.myReduce(line_items, cb, 0)
   // !! That won't do! Calculate the actual subtotal.
  $subTotal.text("$" + subTotalPrice); 
}

function cb(pv, element) {
  if (element.qty < 0) {
    $("#refund").text("Contains refund");
  } return pv + element.price * element.qty; 
}

line_items.sort(function compare(a, b) {
  if (a.description.toLowerCase() < b.description.toLowerCase()) {
    return -1;
  } else if (a.description.toLowerCase() > b.description.toLowerCase()) {
    return 1;
  } else {
    return 0;
  }
})
