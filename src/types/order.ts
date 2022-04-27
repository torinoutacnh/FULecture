export enum OrderStatus {
  COMPLETE = 'Hoàn thành',
  CANCEL_AFTER_COOK = 'Hủy sau chế biến',
  CANCEL_BEFORE_COOK = 'Hủy trước chế biến'
}

export enum PaymentType {
  AT_RESTAURANT = 'Tại quán',
  DELIVERY = 'Giao hàng',
  TAKE_AWAY = 'Mang đi',
  CREDIT = 'Nạp thẻ'
}

export type TOrder = {
  id: number;
  status: OrderStatus;
  paymentType: PaymentType;
};

export const ORDER_STATUS_OPTONS = [
  {
    label: 'Tất cả',
    value: ''
  },
  {
    label: 'Hoàn thành',
    value: OrderStatus.COMPLETE
  },
  {
    label: OrderStatus.CANCEL_AFTER_COOK,
    value: OrderStatus.CANCEL_AFTER_COOK
  },
  {
    label: OrderStatus.CANCEL_BEFORE_COOK,
    value: OrderStatus.CANCEL_BEFORE_COOK
  }
];
export const PAYMENT_TYPE_OPTONS = [
  {
    label: 'Tất cả',
    value: ''
  },
  {
    label: PaymentType.AT_RESTAURANT,
    value: PaymentType.AT_RESTAURANT
  },
  {
    label: PaymentType.DELIVERY,
    value: PaymentType.DELIVERY
  },
  {
    label: PaymentType.TAKE_AWAY,
    value: PaymentType.TAKE_AWAY
  },
  {
    label: PaymentType.CREDIT,
    value: PaymentType.CREDIT
  }
];
