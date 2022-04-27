import request from 'utils/axios';

export const getOrderDetail = (orderId: number) => request.get(`/orders/${orderId}`);
