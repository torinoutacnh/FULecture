import { Box, Button, Grid, Stack } from '@material-ui/core';
import { FilterList } from '@material-ui/icons';
import { useDebounceFn } from 'ahooks';
import { InputField, SelectField } from 'components/form';
import DateRangePickerField from 'components/form/DateRangePickerField';
import useLocales from 'hooks/useLocales';
import React, { useState } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { daysInWeek } from 'utils/utils';
import OrderFilterDrawer from './components/OrderFilterDrawer';

interface OrderSearchFormProps {
  onChange?: Function;
}

const OrderSearchForm = ({ onChange }: OrderSearchFormProps) => {
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const form = useForm({
    defaultValues: {
      invoiceId: null,
      status: '',
      paymentType: '',
      fromTime: [null, null]
    }
  });
  const { translate } = useLocales();

  const { run } = useDebounceFn(
    (values) => {
      if (onChange) {
        onChange(values);
      }
    },
    {
      wait: 500
    }
  );

  const { control } = form;

  const watchValues = useWatch({
    control
  });

  React.useEffect(() => {
    run(watchValues);
  }, [watchValues, run]);

  return (
    <FormProvider {...form}>
      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <Grid container direction="row" spacing={2}>
          <Grid item xs={12} sm={3}>
            <InputField
              name="invoiceId"
              size="small"
              type="email"
              label={translate('pages.orders.table.invoice')}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <DateRangePickerField name="fromTime" />
          </Grid>
          <Box flex={1} />
          <Grid item xs={12} sm={3} textAlign="right">
            <OrderFilterDrawer
              isOpenFilter={isOpenFilter}
              onCloseFilter={() => setIsOpenFilter(false)}
              onOpenFilter={() => setIsOpenFilter(true)}
              onResetFilter={() =>
                form.reset({
                  invoiceId: null,
                  status: '',
                  paymentType: '',
                  fromTime: [null, null]
                })
              }
            />
          </Grid>
        </Grid>
      </Stack>
    </FormProvider>
  );
};

export default OrderSearchForm;
