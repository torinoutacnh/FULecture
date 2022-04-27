/* eslint-disable no-unused-expressions */
import { Grid, MenuItem } from '@material-ui/core';
import { useDebounceFn, useRequest } from 'ahooks';
import useAuth from 'hooks/useAuth';
import useSemester from 'hooks/useSemester';
import { getDepartments } from 'pages/Semesters/SelectedListApi';
import React, { useState, useMemo, useEffect } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { getLecturerDepartments } from 'redux/LecturerDepartment/api';
import { useSelector } from 'redux/store';
import { InputField, SelectField } from '../../components/form';

const SearchApprovingForm = ({ onChange = console.log }) => {
  const { user } = useAuth();
  const { semester } = useSemester();
  const initialValue = [{ id: 0, value: ' --- Select a State ---' }];
  const [departments, setDepartments] = useState(initialValue);

  useEffect(() => {
    getLecturerDepartments({ lectureId: user?.zipCode, isApprover: true }).then((res) => {
      setDepartments(res.data.result);
    });
  }, [user]);
  console.log('departments', departments);

  const form = useForm({
    defaultValues: {
      submitterId: null,
      searchValue: null,
      departmentId: null,
      semesterId: semester.semesterId,
      status: 1
    }
  });

  useMemo(() => {
    form.setValue('semesterId', semester.semesterId);
  }, [semester.semesterId]);

  const { run } = useDebounceFn(
    (values) => {
      if (onChange) {
        if (values.departmentId === 'All') {
          values.departmentId = null;
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
            {departments?.map(({ departmentId, department }) => (
              <MenuItem value={departmentId} key={`cate_select_${departmentId}`}>
                {department?.code}
              </MenuItem>
            ))}
          </SelectField>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default SearchApprovingForm;
