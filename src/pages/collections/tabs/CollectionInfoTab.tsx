import { Box, Grid, MenuItem, Slider, Typography } from '@material-ui/core';
import React from 'react';
import { Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { InputField, SelectField, UploadImageField } from 'components/form';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import useLocales from 'hooks/useLocales';
import { Card, CardTitle } from '../../Products/components/Card';

const marks = [
  {
    value: 0,
    label: 'Đầu tiền'
  },
  {
    value: 100,
    label: 'Cuối cùng'
  }
];

const CollectionInfoTab = ({ onSubmit }: { onSubmit: Function }) => {
  const { stores } = useSelector((state: RootState) => state.admin);
  const { translate } = useLocales();

  return (
    <Box>
      <Card>
        <CardTitle>{translate('collections.collectionInfoTab')}</CardTitle>
        <Grid spacing={2} container>
          <Grid item xs={4}>
            <UploadImageField.Avatar
              label={translate('collections.table.banner_url')}
              name="banner_url"
            />
          </Grid>
          <Grid item xs={8}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <InputField
                  size="small"
                  fullWidth
                  name="name"
                  label={translate('collections.table.collectionName')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField
                  size="small"
                  fullWidth
                  name="name_eng"
                  label={translate('collections.table.collectionNameEn')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectField
                  fullWidth
                  label={translate('collections.table.store')}
                  size="small"
                  name="store_id"
                >
                  {stores?.map(({ id, name }: any) => (
                    <MenuItem value={Number(id)} key={`cate_select_${id}`}>
                      {name}
                    </MenuItem>
                  ))}
                </SelectField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField
                  size="small"
                  rows={4}
                  multiline
                  fullWidth
                  name="description"
                  label={translate('collections.table.description')}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom>{translate('collections.table.position')}</Typography>
                <Box px={4}>
                  <Controller
                    name="position"
                    render={({ field }) => (
                      <Slider
                        sx={{ width: '100%' }}
                        aria-label="Custom marks"
                        defaultValue={0}
                        step={1}
                        valueLabelDisplay="auto"
                        marks={marks}
                        {...field}
                      />
                    )}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box textAlign="right" mt={2}>
          <LoadingAsyncButton onClick={onSubmit} variant="contained">
            {translate('common.update')}
          </LoadingAsyncButton>
        </Box>
      </Card>
    </Box>
  );
};

export default CollectionInfoTab;
