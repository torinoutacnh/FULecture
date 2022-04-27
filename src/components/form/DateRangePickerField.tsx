/* eslint-disable react/prop-types */
import { Box, Input, TextField, TextFieldProps } from '@material-ui/core';
import { DatePickerProps, DateRangePicker } from '@material-ui/lab';
import useLocales from 'hooks/useLocales';
import moment from 'moment';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  label?: string;
  rules?: any;
  defaultValue?: any;
};

const DateRangePickerField: React.FC<Props & Partial<DatePickerProps>> = ({
  name,
  label = null,
  rules,
  defaultValue = [],
  ...props
}) => {
  const { control } = useFormContext();
  const { translate } = useLocales();

  return (
    <Controller
      render={({ field, fieldState }) => (
        <DateRangePicker
          calendars={2}
          {...field}
          renderInput={(startProps, endProps) => (
            <>
              <TextField
                size="small"
                {...startProps}
                label={translate('common.fromTime')}
                placeholder={translate('common.fromTime')}
              />
              <TextField
                size="small"
                {...endProps}
                label={translate('common.toTime')}
                placeholder={translate('common.toTime')}
              />
            </>
          )}
        />
      )}
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
    />
  );
};

export default DateRangePickerField;
