/**
 * Created by ubuntu on 17-7-21.
 */
describe('buildItems', ()=> {
  let inputs = [
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000003-2',
    'ITEM000005',
    'ITEM000005',
    'ITEM000005'
  ];
  it('should return correct items', ()=> {
    const countedItems = [
      {
        item: {
          barcode: 'ITEM000001',
          name: '雪碧',
          unit: '瓶',
          price: 3.00
        },
        count: 5
      },
      {
        item: {
          barcode: 'ITEM000003',
          name: '荔枝',
          unit: '斤',
          price: 15.00
        },
        count: 2
      },
      {
        item: {
          barcode: 'ITEM000005',
          name: '方便面',
          unit: '袋',
          price: 4.5
        },
        count: 3
      }
    ];
    expect(buildItems(inputs)).toEqual(countedItems);
  });
});
describe('buildItemStatus', ()=> {
  let itemCount = [
    {
      item: {
        barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3.00
      },
      count: 5
    },
    {
      item: {
        barcode: 'ITEM000003',
        name: '荔枝',
        unit: '斤',
        price: 15.00
      },
      count: 2
    },
    {
      item: {
        barcode: 'ITEM000005',
        name: '方便面',
        unit: '袋',
        price: 4.5
      },
      count: 3
    }
  ];
  it('should return subTotal', ()=> {
    const itemTotal = [
      {
        cartItem: {
          item: {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
          },
          count: 5
        },
        subtotal: 12,
        itemDiscount: 3
      },
      {
        cartItem: {
          item: {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00
          },
          count: 2
        },
        subtotal: 30,
        itemDiscount: 0
      },
      {
        cartItem: {
          item: {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.5
          },
          count: 3
        },
        subtotal: 9,
        itemDiscount: 4.5,
      },
    ];
    expect(buildItemTotalStatus(itemCount)).toEqual(itemTotal);
  })
});
describe('buildTotalStatus', ()=> {
  let itemTotal = [
    {
      cartItem: {
        item: {
          barcode: 'ITEM000001',
          name: '雪碧',
          unit: '瓶',
          price: 3.00
        },
        count: 5
      },
      subtotal: 12,
      itemDiscount: 3
    },
    {
      cartItem: {
        item: {
          barcode: 'ITEM000003',
          name: '荔枝',
          unit: '斤',
          price: 15.00
        },
        count: 2
      },
      subtotal: 30,
      itemDiscount: 0
    },
    {
      cartItem: {
        item: {
          barcode: 'ITEM000005',
          name: '方便面',
          unit: '袋',
          price: 4.5
        },
        count: 3
      },
      subtotal: 9,
      itemDiscount: 4.5,
    },
  ];
  it('should return total', ()=> {
    const total = {
      list: [
        {
          cartItem: {
            item: {
              barcode: 'ITEM000001',
              name: '雪碧',
              unit: '瓶',
              price: 3.00
            },
            count: 5
          },
          subtotal: 12,
          itemDiscount: 3
        },
        {
          cartItem: {
            item: {
              barcode: 'ITEM000003',
              name: '荔枝',
              unit: '斤',
              price: 15.00
            },
            count: 2
          },
          subtotal: 30,
          itemDiscount: 0
        },
        {
          cartItem: {
            item: {
              barcode: 'ITEM000005',
              name: '方便面',
              unit: '袋',
              price: 4.5
            },
            count: 3
          },
          subtotal: 9,
          itemDiscount: 4.5,
        },
      ],
      total: 51,
      discount: 7.5
    };
    expect(buildTotalStatus(itemTotal)).toEqual(total);
  });
})
