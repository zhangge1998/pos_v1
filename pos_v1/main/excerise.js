let printReceipt = (inputs) => {
  let itemCount = buildItems(inputs);
  let itemTotal = buildItemTotalStatus(itemCount);
  let total = buildTotalStatus(itemTotal);
  let string = printReceiptTxt(total);
  console.log(string);
};

let buildItems = (inputs)=> {
  let itemCount = [];
  let allItems = loadAllItems();
  for (let input of inputs) {
    let splitInput = input.split("-");
    let barcode = splitInput[0];
    let count = parseFloat(splitInput[1] || 1);
    let cartItem = itemCount.find((cartItem)=>cartItem.item.barcode === barcode);
    if (cartItem) {
      cartItem.count += count;
    }
    else {
      let item = allItems.find((item)=> item.barcode === barcode);
      itemCount.push({item: item, count: count});
    }
  }
  return itemCount;
};

let buildItemTotalStatus = (itemCount)=>{
  return itemCount.map(cartItem=>{
    let promotionType = getPromotionType(cartItem);
    let {subtotal,itemDiscount} = discount(promotionType,cartItem);
    return {cartItem,subtotal,itemDiscount};
  })
}

let getPromotionType = (cartItem)=>{
  let promotions = loadPromotions();
  let promotion = promotions.find((promotion)=>promotion.barcodes.includes(cartItem.item.barcode));
  return promotion?promotion.type:' ';
}

let discount = (promotionType,cartItem)=>{
  let freeItemCount = 0;
  if(promotionType === "BUY_TWO_GET_ONE_FREE"){
    freeItemCount = parseInt(cartItem.count/3);
  }
  let itemDiscount = cartItem.item.price * freeItemCount;
  let subtotal = cartItem.item.price*(cartItem.count -freeItemCount);
  return {subtotal,itemDiscount};
}

let buildTotalStatus = (cartItemStatus)=> {
  let total = 0;
  let discount = 0;
  for (let itemStatus of cartItemStatus) {
    total += itemStatus.subtotal;
    discount += itemStatus.itemDiscount;
  }
  return {list: cartItemStatus, total: total, discount: discount};
};

let printReceiptTxt = (total)=> {
  var string = '***<没钱赚商店>收据***';
  for (var k = 0; k < total.list.length; k++) {
    var object = total.list[k];
    string += '\n' + '名称：' + object.cartItem.item.name + '，' + '数量：' + object.cartItem.count + object.cartItem.item.unit + '，' + '单价：' + object.cartItem.item.price.toFixed(2) + '(元)' + '，' + '小计：' + object.subtotal.toFixed(2) + '(元)';
  }
  string += '\n' + '----------------------' + '\n' + '总计：' + total.total.toFixed(2) + '(元)' + '\n' + '节省：' + total.discount.toFixed(2) + '(元)' + '\n' + '**********************';
  return string;
};
