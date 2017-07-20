function printReceipt(inputs) {
  var itemCount = buildItems(inputs);
  var itemTotal = buildItemTotalStatus(itemCount);
  var total = buildTotalStatus(itemTotal);
  var string = printReceiptTxt(total);
  console.log(string);
}

function buildItems(inputs) {
  var itemCount = [];
  var allItems = loadAllItems();
  for (var i = 0; i < allItems.length; i++) {
    var count = isExit(allItems[i], inputs);
    if (count > 0) {
      itemCount.push({item: allItems[i], count: count});
    }
  }
  return itemCount;
}

function isExit(allItems, inputs) {
  var count = 0;
  for (var j = 0; j < inputs.length; j++) {
    if (allItems.barcode == inputs[j].substring(0, 10)) {
      count += eleCount(inputs[j]);
    }
  }
  return count;
}

function eleCount(item) {
  if (item.length == 10)
    return 1;
  else {
    var eleCount = item.split("-");
    return parseFloat(eleCount[1]);
  }
}

function buildItemTotalStatus(itemCount) {
  var cartItemStatus = [];
  var promotions = loadPromotions();
  for (var i = 0; i < itemCount.length; i++) {
    var temp = itemCount[i];
    if (isPromotion(itemCount[i], promotions)) {
      var save = Math.floor(temp.count / 3) * temp.item.price;
      var subtotal = temp.item.price * temp.count - save;
      cartItemStatus.push({cartItem: itemCount[i], subtotal: subtotal, itemDiscount: save});
    }
    else {
      var subtotal1 = temp.item.price * temp.count;
      cartItemStatus.push({cartItem: itemCount[i], subtotal: subtotal1, itemDiscount: 0});
    }
  }
  return cartItemStatus;
}

function isPromotion(itemCount, promotions) {
  for (var j = 0; j < promotions[0].barcodes.length; j++) {
    if (itemCount.item.barcode == promotions[0].barcodes[j] && itemCount.count >= 3) {
      return 1;
    }
  }
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





