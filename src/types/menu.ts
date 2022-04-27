export type Menu = {
  menu_id: number;
  store_id: number;
  time_from?: any;
  time_to?: any;
  day_filter?: any;
  active?: any;
  menu_name?: any;
  store_name: string;
  day_filters: number[];
  time_range: string[];
};

export type TStoreApplyMenuRequest = {
  menu_in_store_id?: number;
  store_id: number;
  time_range: string[];
  day_filters: number[];
};
