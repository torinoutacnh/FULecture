/* eslint-disable no-unused-expressions */
import { Grid, MenuItem } from '@material-ui/core';
import { useDebounceFn, useRequest } from 'ahooks';
import { getSemesters } from 'pages/Semesters/SelectedListApi';
import React, { useState } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { InputField, SelectField } from '../../components/form';

const SearchSemesterForm = ({ onChange = console.log }) => {
  const form = useForm({
    defaultValues: {
      searchValue: null,
      semesterId: null
    }
  });

  const { run } = useDebounceFn(
    (values) => {
      if (onChange) {
        if (values.semesterId === 'Tất Cả') {
          values.semesterId = null;
        }
        if (values.searchValue === '') {
          values.searchValue = null;
        }
        onChange(values);
      }
    },
    {
      wait: 500
    }
  );
  const { data: semesters } = useRequest(() => getSemesters({ isDisable: false }), {
    formatResult: (res) => res.data.result
  });
  const { control } = form;

  const watchValues = useWatch({
    control
  });

  React.useEffect(() => {
    run(watchValues);
  }, [watchValues, run]);

  return (
    <FormProvider {...form}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <InputField name="searchValue" size="small" type="text" label="Tìm" />
        </Grid>
        <Grid item xs={12} sm={3}>
          <SelectField
            name="semesterId"
            label="Choose semester"
            fullWidth
            defaultValue=""
            size="small"
          >
            <MenuItem value="Tất Cả" key="cate_select_all">
              Tất cả
            </MenuItem>
            {semesters?.map(({ semesterId, name }) => (
              <MenuItem value={semesterId} key={`cate_select_${semesterId}`}>
                {name}
              </MenuItem>
            ))}
          </SelectField>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default SearchSemesterForm;
