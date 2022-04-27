import React from 'react';

/* eslint-disable camelcase */
import { formatCurrency } from 'utils/utils';
import { Chip, Avatar, Typography } from '@material-ui/core';
import { PRODUCT_TYPE_DATA } from 'constraints';
import Label from 'components/Label';

export const productColumns = [
  {
    title: 'STT',
    dataIndex: 'index'
  },
  {
    title: 'Hình ảnh',
    dataIndex: 'pic_url',
    render: (src, { product_name }) => (
      <Avatar
        alt={product_name}
        src={src}
        variant="square"
        style={{ width: '54px', height: '54px' }}
      />
    )
  },
  {
    title: 'Tên sản phẩm',
    dataIndex: 'product_name'
  },
  {
    title: 'Nhóm Sản Phẩm',
    dataIndex: 'cate_name',
    valueType: 'select'
  },
  {
    title: 'Loại Sản Phẩm',
    dataIndex: 'product_type',
    render: (type) => <Chip label={PRODUCT_TYPE_DATA.find(({ value }) => value === type).label} />
  },
  {
    title: 'Giá',
    dataIndex: 'price',
    render: (price) => <Typography>{formatCurrency(price)}</Typography>
  },
  {
    title: 'Trạng thái',
    dataIndex: 'is_available',
    width: 150,
    render: (available) => (
      <Label color={available ? 'primary' : 'default'}>
        {available ? 'Đang bán' : 'Ngừng bán'}
      </Label>
    )
  }
];
