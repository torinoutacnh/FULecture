import request from '../../utils/axios';

export const createMasterProd = (data) => request.post(`/products`, data);

export const getProdById = (id) => request.get(`/products/${id}`);

export const updateProdById = (id, data) => request.put(`/products/${id}`, data);

export const deleteProdById = (id) => request.delete(`/products/${id}`);

export const getAllProduct = (params = {}) =>
  request.get('/products', {
    params
  });
