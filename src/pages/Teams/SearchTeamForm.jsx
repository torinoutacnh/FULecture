/* eslint-disable no-unused-expressions */
import React, { useState, useMemo } from 'react';
import { Grid, MenuItem } from '@material-ui/core';
import { useDebounceFn, useRequest } from 'ahooks';
import { getDepartments } from 'pages/Semesters/SelectedListApi';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import useSemester from 'hooks/useSemester';

import { InputField, SelectField } from '../../components/form';

const SearchTeamForm = ({ onChange = console.log }) => {
  const { semester } = useSemester();

  const form = useForm({
    defaultValues: {
      searchValue: null,
      departmentId: null,
      semesterId: semester.semesterId
    }
  });
  useMemo(() => {
    form.setValue('semesterId', semester.semesterId);
  }, [semester.semesterId]);

  const { run } = useDebounceFn(
    (values) => {
      if (values.departmentId === 'All') {
        values.departmentId = null;
      }
      if (values.searchValue === '') {
        values.searchValue = null;
      }
      if (onChange) {
        onChange(values);
      }
    },
    {
      wait: 500
    }
  );
  const { data: departments } = useRequest(() => getDepartments({ isDisable: false }), {
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
        <Grid item xs={12} sm={4}>
          <InputField name="searchValue" size="small" type="text" label="Search..." />
        </Grid>
        <Grid item xs={12} sm={3}>
          <SelectField
            name="departmentId"
            label="Department"
            fullWidth
            defaultValue=""
            size="small"
          >
            <MenuItem value="All" key="cate_select_all">
              All
            </MenuItem>
            {departments?.map(({ departmentId, name }) => (
              <MenuItem value={departmentId} key={`cate_select_${departmentId}`}>
                {name}
              </MenuItem>
            ))}
          </SelectField>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default SearchTeamForm;
