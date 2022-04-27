import { Box, Divider, Stack, Typography } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { InputField, RadioGroupField, UploadImageField } from '../../../components/form';
import { PRODUCT_TYPE_DATA } from '../../../constraints';
import VariantForm from '../VariantForm';
import { Card, CardTitle } from './Card';

type Props = {
  updateMode?: boolean;
};

// eslint-disable-next-line arrow-body-style
const MiddleForm: React.FC<Props> = ({ updateMode }) => {
  const { control, setValue, handleSubmit } = useFormContext();

  return (
    <Box p={1} flex={1}>
      <Card id="product-detail">
        <Box textAlign="left">
          <CardTitle mb={2} variant="subtitle1">
            Chi tiết sản phẩm
          </CardTitle>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <InputField name="code" label="Mã sản phẩm" required size="small" />
              <InputField
                name="product_name"
                label="Tên sản phẩm"
                required
                size="small"
                fullWidth
              />
            </Stack>
            <Box>
              <InputField
                name="description"
                sx={{
                  width: '100%'
                }}
                id="outlined-multiline-static"
                multiline
                rows={4}
                variant="outlined"
                label="Miêu tả"
              />
            </Box>
          </Stack>
          <Typography my={2} variant="subtitle2">
            Loại sản phẩm
          </Typography>
          <RadioGroupField
            size="small"
            name="product_type"
            // label="Loại"
            options={PRODUCT_TYPE_DATA}
            disabled
            fullWidth
            sx={{
              flexDirection: 'row'
            }}
          />
        </Box>
      </Card>

      <Card id="pic_url">
        <Box textAlign="left">
          <CardTitle variant="subtitle1">Hình ảnh</CardTitle>
          <UploadImageField name="pic_url" label="Hình ảnh" />
        </Box>
      </Card>

      <Card id="variants">
        <Box textAlign="left">
          <CardTitle variant="subtitle1">Mẫu mã</CardTitle>
          <Stack direction="column">
            <Stack direction="column" justifyContent="start" spacing={2}>
              <Divider />
              <Typography variant="subtitle2">Tùy chọn</Typography>
              <VariantForm name="variants" updateMode={updateMode} />
            </Stack>
          </Stack>
        </Box>
      </Card>
      <Card id="seo">
        <Box textAlign="left">
          <CardTitle mb={2} variant="subtitle1">
            SEO
          </CardTitle>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <InputField
                name="seo_name"
                size="small"
                type="text"
                label="Đường dẫn SEO"
                sx={{
                  width: '50%'
                }}
              />
              <InputField
                name="seo_key_words"
                size="small"
                type="text"
                label="Từ khóa SEO"
                sx={{
                  width: '50%'
                }}
              />
            </Stack>
            <InputField
              name="seo_description"
              fullWidth
              id="outlined-multiline-static"
              multiline
              rows={4}
              variant="outlined"
              label="Mô tả SEO"
            />
          </Stack>
        </Box>
      </Card>
    </Box>
  );
};

export default MiddleForm;
