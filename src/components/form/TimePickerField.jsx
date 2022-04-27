/* eslint-disable react/prop-types */
import { TextField } from '@material-ui/core';
import { TimePicker } from '@material-ui/lab';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const TimePickerField = ({ name, label, defaultValue = '', transform, ...props }) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <TimePicker
          label={label}
          renderInput={(params) => <TextField error={fieldState.error} {...params} {...props} />}
          {...field}
          onChange={(e) => field.onChange(transform ? transform.output(e) : e)}
        />
      )}
      label={label}
      name={name}
    />
  );
};

export default TimePickerField;
