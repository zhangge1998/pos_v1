let printReceipt=(inputs) =>{
  let itemCount = buildItems(inputs);
  let itemTotal = buildItemTotalStatus(itemCount);
  let total = buildTotalStatus(itemTotal);
  let string = printReceiptTxt(total);
  console.log(string);
}

let buildItems=(inputs)=> {
  let itemCount = [];
  let allItems = loadAllItems();
  for (let allItem of allItems) {
    let count = isExit(allItem, inputs);
    if (count > 0) {
      itemCount.push({item: allItem, count: count});
    }
  }
  return itemCount;
}

let isExit=(allItems, inputs)=> {
  let count = 0;
  for (let input of inputs) {
    if (allItems.barcode == input.substring(0, 10)) {
      count += eleCount(input);
    }
  }
  return count;
}

let eleCount=(item)=> {
  if (item.length == 10)
    return 1;
  else {
    let eleCount = item.split("-");
    return parseFloat(eleCount[1]);
  }
}

let buildItemTotalStatus=(itemCount)=> {
  let cartItemStatus = [];
  for (let cartItem of itemCount) {
    if (isPromotion(cartItem)) {
      let save = Math.floor(cartItem.count / 3) * cartItem.item.price;
      let subtotal = cartItem.item.price * cartItem.count - save;
      cartItemStatus.push({cartItem: cartItem, subtotal: subtotal, itemDiscount: save});
    }
    else {
      let subtotal1 = cartItem.item.price * cartItem.count;
      cartItemStatus.push({cartItem: cartItem, subtotal: subtotal1, itemDiscount: 0});
    }
  }
  return cartItemStatus;
}

let isPromotion=(cartItem)=> {
  // for (let promotion of promotions[0].barcodes) {
  //   if (itemCount.item.barcode == promotions[0].barcodes[j] && itemCount.count >= 3) {
  //     return 1;
  //   }
  // }
  let promotions = loadPromotions();
  let promotion = promotions.find((promotion)=>promotion.barcodes.includes(cartItem.item.barcode));
  return 1;
}

function buildTotalStatus(cartItemStatus) {
  var total = 0;
  var discount = 0;
  for (var i = 0; i < cartItemStatus.length; i++) {
    total += cartItemStatus[i].subtotal;
    discount += cartItemStatus[i].itemDiscount;
  }
  return {list: cartItemStatus, total: total, discount: discount};
}

function printReceiptTxt(total) {
  var string = '***<没钱赚商店>收据***';
  for (var k = 0; k < total.list.length; k++) {
    var object = total.list[k];
    string += '\n' + '名称：' + object.cartItem.item.name + '，' + '数量：' + object.cartItem.count + object.cartItem.item.unit + '，' + '单价：' + object.cartItem.item.price.toFixed(2) + '(元)' + '，' + '小计：' + object.subtotal.toFixed(2) + '(元)';
  }
  string += '\n' + '----------------------' + '\n' + '总计：' + total.total.toFixed(2) + '(元)' + '\n' + '节省：' + total.discount.toFixed(2) + '(元)' + '\n' + '**********************';
  return string;
}





