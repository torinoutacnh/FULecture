import { Stack, Container, Grid, Card, Typography, Button } from '@material-ui/core';
import { AccountBalanceSharp } from '@material-ui/icons';
import React, { useRef, useState, useEffect, ChangeEvent } from 'react';
import useRequest from '@ahooksjs/use-request';
import ResoTable from 'components/ResoTable/ResoTable';
import { getSemesters } from 'redux/semester/api';
import { useNavigate } from 'react-router';

import { useSnackbar } from 'notistack5';
import { SEMESTER_STATUS } from 'constraints';

import { semesterColumns } from './config';

import Page from '../../components/Page';

import SearchSemesterForm from './SearchSemesterForm';
import { COLORS } from './colors';

function SemesterList() {
  const { data: semestersData = [] } = useRequest(getSemesters, {
    formatResult: (res) => res.data.result
  });

  const [filters, setFilters] = useState(null);

  const navigate = useNavigate();
  const tableRef = useRef();

  return (
    <Page title="Semester | FCMS">
      <Container mt={10} style={{ minWidth: '80%' }}>
        <Stack direction="row" display="flex" height="200px" width="100%" overflow="scroll">
          <Grid
            container
            direction="column"
            spacing={4}
            justifyContent="center"
            alignItems="center"
          >
            {semestersData?.map(({ semesterId, name, status }) => (
              <Grid item xs={5} key={semesterId}>
                <Button
                  style={{ borderRadius: '20px' }}
                  key={semesterId}
                  sx={{ width: '200px', height: '140px' }}
                  variant="contained"
                  color={SEMESTER_STATUS.find(({ value }) => value === status)?.color}
                >
                  <Grid display="flex" direction="column" style={{ alignItems: 'flex-start' }}>
                    <AccountBalanceSharp />
                    <Typography variant="h5">{name}</Typography>
                    <Typography variant="subtitle1">{status}</Typography>
                  </Grid>
                </Button>
              </Grid>
            ))}
          </Grid>
        </Stack>

        <Stack>
          <Card style={{ padding: '1em' }}>
            <Stack spacing={2}>
              <SearchSemesterForm onChange={setFilters} />
              <ResoTable
                ref={tableRef}
                pagination
                getData={getSemesters}
                filters={filters}
                columns={semesterColumns}
                rowKey="topicId"
                showAction={false}
              />
            </Stack>
          </Card>
        </Stack>
      </Container>
    </Page>
  );
}

export default SemesterList;
