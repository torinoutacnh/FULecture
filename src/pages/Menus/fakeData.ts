import { StoreInMenu } from 'types/store';

export const MENUINSTORES: StoreInMenu[] = [
  {
    menu_in_store_id: 1,
    time_range: ['07:00', '12:00'],
    dayFilters: [0, 1, 2, 3],
    store: {
      id: 1,
      store_name: 'Cửa hàng Q1'
    }
  },
  {
    menu_in_store_id: 2,
    time_range: ['08:30', '14:00'],
    dayFilters: [0, 1, 2, 3],
    store: {
      id: 2,
      store_name: 'Cửa hàng Q2'
    }
  },
  {
    menu_in_store_id: 3,
    time_range: ['17:30', '20:00'],
    dayFilters: [2, 3, 4, 5],
    store: {
      id: 2,
      store_name: 'Cửa hàng Q2'
    }
  },
  {
    menu_in_store_id: 4,
    time_range: ['08:30', '14:00'],
    dayFilters: [0, 1, 2, 3],
    store: {
      id: 3,
      store_name: 'Cửa hàng Q3'
    }
  }
];
