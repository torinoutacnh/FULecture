/* eslint-disable no-unused-expressions */
import { Grid, MenuItem } from '@material-ui/core';
import { useDebounceFn, useRequest } from 'ahooks';
import useSemester from 'hooks/useSemester';
import { getDepartments } from 'pages/Semesters/SelectedListApi';
import React, { useState, useMemo } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useSelector } from 'redux/store';
import { InputField, SelectField } from '../../../components/form';

const SearchEvidenceForm = ({ onChange = console.log, pId }) => {
  const { semester } = useSemester();

  const form = useForm({
    defaultValues: {
      name: null,
      semesterId: semester.semesterId,
      projectId: pId
    }
  });

  useMemo(() => {
    form.setValue('semesterId', semester.semesterId);
  }, [semester.semesterId]);

  const { run } = useDebounceFn(
    (values) => {
      if (onChange) {
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
          <InputField name="name" size="small" type="text" label="Search..." />
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default SearchEvidenceForm;
