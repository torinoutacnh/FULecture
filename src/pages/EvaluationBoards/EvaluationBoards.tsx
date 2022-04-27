import React, { useRef, useState, useEffect } from 'react';
import {
  Button,
  Card,
  Container,
  Stack,
  Typography,
  Grid,
  Breadcrumbs,
  Link
} from '@material-ui/core';
import { useNavigate } from 'react-router';
import { HomeOutlined, WhatshotOutlined, DateRangeOutlined } from '@material-ui/icons';
import Icon from '@iconify/react';

import plusFill from '@iconify/icons-eva/plus-fill';
import ResoTable from 'components/ResoTable/ResoTable';

import useSemester from 'hooks/useSemester';
import { getEvaluationBoards } from 'redux/EvaluationBoards/api';

import { evaluationBoardColumns } from './config';

import { PATH_DASHBOARD } from '../../routes/paths';

import Page from '../../components/Page';
import SearchEvaluationBoardForm from './SearchEvaluationBoardForm';

export default function EvaluationBoards() {
  const [filters, setFilters] = useState();
  const { semester } = useSemester();
  const navigate = useNavigate();
  const tableRef = useRef();

  return (
    <Page title="Evaluation Boards | FCMS">
      <Container>
        <Stack
          display="flex"
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          mb={4}
          spacing={4}
        >
          <Grid display="column" xs={12}>
            <Grid display="flex" direction="row">
              <Grid direction="column" xs={10}>
                <Grid role="presentation">
                  <Breadcrumbs aria-label="breadcrumb">
                    <Link
                      underline="hover"
                      sx={{ display: 'flex', alignItems: 'center' }}
                      color="inherit"
                      href="#"
                      onClick={() => {
                        navigate(PATH_DASHBOARD.semester.root);
                      }}
                    >
                      <HomeOutlined sx={{ mr: 0.5 }} fontSize="inherit" />
                      Semester
                    </Link>
                    <Link
                      underline="hover"
                      sx={{ display: 'flex', alignItems: 'center' }}
                      color="inherit"
                      href="#"
                      onClick={() => {
                        navigate(PATH_DASHBOARD.root);
                      }}
                    >
                      <DateRangeOutlined sx={{ mr: 0.5 }} fontSize="inherit" />
                      {semester?.name}
                    </Link>

                    <Link
                      underline="hover"
                      sx={{ display: 'flex', alignItems: 'center' }}
                      color="inherit"
                      href="#"
                      onClick={() => {
                        navigate(PATH_DASHBOARD.EvaluationBoards.list);
                      }}
                    >
                      <WhatshotOutlined sx={{ mr: 0.5 }} fontSize="inherit" />
                      Evaluation Boards
                    </Link>
                  </Breadcrumbs>
                  <Grid marginTop={1} display="flex" direction="row">
                    <Typography variant="h5" gutterBottom>
                      Evaluation Boards of {semester?.name}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Stack>
        <Card style={{ padding: '1em' }}>
          <Stack spacing={2}>
            <SearchEvaluationBoardForm onChange={setFilters} />
            <ResoTable
              ref={tableRef}
              pagination
              showAction={false}
              getData={getEvaluationBoards}
              filters={filters}
              columns={evaluationBoardColumns}
              rowKey="evaluationBoardId"
            />
          </Stack>
        </Card>
      </Container>
    </Page>
  );
}
