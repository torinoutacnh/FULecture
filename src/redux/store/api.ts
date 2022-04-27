import { generateAPIWithPaging } from 'redux/utils';
import { TStore } from 'types/store';
import request from 'utils/axios';

export const getStores = (params: any) => request.get('/stores', { params });

const storeApi = {
  ...generateAPIWithPaging<TStore>('stores')
};

export default storeApi;
