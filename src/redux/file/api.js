import axios from 'axios';
import request from '../../utils/axios';

export const uploadfile = (fileData) =>
  request.post(`/files/topic`, fileData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

export const uploadfiletoreso = (fileData) =>
  axios.post(`https://api-sale.reso.vn/api/v1/files`, fileData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
