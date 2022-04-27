/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { Box, Divider, MenuItem, Grid } from '@material-ui/core';
import Icon from '@iconify/react';
import { makeStyles } from '@material-ui/styles';
import { useFormContext, useWatch } from 'react-hook-form';
import { LoadingButton } from '@material-ui/lab';
import useRequest from '@ahooksjs/use-request';
import { useParams } from 'react-router-dom';
import { getTopicById } from 'redux/topic/api';

import { CardTitle, StickyCard, Card } from './Card';
import { InputField, SelectField, SwitchField } from '../../../components/form';
import { getDepartments, getSemesters, getTeams, getCompanies } from './SelectedListApi';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginY: theme.spacing(1),
    minWidth: 120,
    width: '100%'
  }
}));

const RightForm = ({ isUpdate }) => {
  // const classes = useStyles();
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const [isSubmitting, setIsSubmitting] = React.useState(false);

  // const open = Boolean(anchorEl);

  const { data: departmentsData = [] } = useRequest(getDepartments, {
    formatResult: (res) => res.data.result
  });

  // const { data: teamsData = [] } = useRequest(getTeams, {
  //   formatResult: (res) => res.data.result
  // });

  const { data: companiesData = [] } = useRequest(getCompanies, {
    formatResult: (res) => res.data.result
  });

  const { control, setValue } = useFormContext();

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  return (
    <Box p={1} width="250px">
      <StickyCard>
        <CardTitle>Number of members</CardTitle>
        <Grid spacing={2} container>
          <Grid item xs={12} sm={12}>
            <InputField
              disabled={!isUpdate}
              fullWidth
              required
              name="minMember"
              label="Min"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <InputField
              disabled={!isUpdate}
              fullWidth
              required
              name="maxMembers"
              label="Max"
              size="small"
            />
          </Grid>
        </Grid>
      </StickyCard>
      <Card sx={{ textAlign: 'left', paddingX: 0 }}>
        <Box textAlign="left">
          <CardTitle>Department</CardTitle>
          <SelectField
            disabled={!isUpdate}
            name="departmentId"
            label="Department"
            fullWidth
            size="small"
          >
            {departmentsData?.map(({ departmentId, name }) => (
              <MenuItem value={departmentId} key={departmentId}>
                {name}
              </MenuItem>
            ))}
          </SelectField>
        </Box>
        <Box my={2}>
          <Divider />
        </Box>

        {/* <Box textAlign="left">
          <CardTitle>Team </CardTitle>
          <SelectField name="teamId" label="Team" fullWidth size="small">
            {teamsData?.map(({ teamId, name, code }) => (
              <MenuItem value={teamId} key={teamId}>
                [{code}] {name}
              </MenuItem>
            ))}
          </SelectField>
        </Box> */}
        <Box my={2}>
          <Box textAlign="left">
            <CardTitle>Company</CardTitle>
            <SelectField
              disabled={!isUpdate}
              name="companyId"
              label="Company"
              fullWidth
              size="small"
            >
              {companiesData?.map(({ companyId, name }) => (
                <MenuItem value={companyId} key={companyId}>
                  {name}
                </MenuItem>
              ))}
            </SelectField>
          </Box>
        </Box>
      </Card>
      {/* <Card>
        <Box textAlign="left">
          <CardTitle>Criteria</CardTitle>
          <SelectField disabled={!isUpdate} name="criteria" label="Criteria" fullWidth size="small">
            {departmentsData?.map(({ departmentId, name }) => (
              <MenuItem value={departmentId} key={departmentId}>
                {name}
              </MenuItem>
            ))}
          </SelectField>
        </Box>
      </Card> */}
    </Box>
  );
};

export default RightForm;
