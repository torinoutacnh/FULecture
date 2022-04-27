/* eslint-disable no-unused-expressions */
import { CircularProgress, Grid, MenuItem } from '@material-ui/core';
import { useDebounceFn, useRequest } from 'ahooks';
import useSemester from 'hooks/useSemester';
import { getDepartments } from 'pages/Semesters/SelectedListApi';
import React, { useState, useMemo, useEffect } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useParams } from 'react-router';
import { useSelector } from 'redux/store';
import { getTeamById } from 'redux/teams/api';
import { getWeeklyReports } from 'redux/WeeklyReport/api';
import { InputField, SelectField } from '../../components/form';

const SearchInvidualForm = ({ onChange = console.log, pId, teamData }) => {
  const { semester } = useSemester();

  const form = useForm({
    defaultValues: {
      semesterId: semester?.semesterId,
      // projectId: pId !== undefined ? pId : null,
      projectId: pId,
      ReportBy: null
    }
  });

  useMemo(() => {
    form.setValue('semesterId', semester?.semesterId);
  }, [semester.semesterId]);

  const { run } = useDebounceFn(
    (values) => {
      if (onChange) {
        if (values.ReportBy === 'All') {
          values.ReportBy = null;
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
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={3}>
          <SelectField name="ReportBy" label="Report by ..." fullWidth defaultValue="" size="small">
            <MenuItem value="All" key="cate_select_all">
              All
            </MenuItem>
            {teamData?.map(({ student }) => (
              <MenuItem value={student?.name} key={`cate_select_${student?.name}`}>
                {student?.name}
              </MenuItem>
            ))}
          </SelectField>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default SearchInvidualForm;
