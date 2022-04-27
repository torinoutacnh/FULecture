import Icon from '@iconify/react';
import { Stack, Box, Avatar, IconButton, Typography } from '@material-ui/core';
import ResoTable from 'components/ResoTable/ResoTable';
import React from 'react';
import closeIcon from '@iconify/icons-eva/close-outline';

const AddProductTable = ({ data = [], onRemove }) => {
  const a = '';
  return (
    <Box>
      <ResoTable
        dataSource={data}
        checkboxSelection
        pagination={false}
        showAction={false}
        rowKey="product_id"
        columns={[
          {
            title: 'Sản phẩm',
            render: (text, prod) => (
              <Box display="flex" justifyContent="space-between">
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar variant="square" src={prod.pic_url} />
                  <Typography noWrap>{prod.product_name}</Typography>
                </Stack>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(Number(prod.product_id));
                  }}
                >
                  <Icon icon={closeIcon} />
                </IconButton>
              </Box>
            )
          }
        ]}
      />
    </Box>
  );
};

export default AddProductTable;
