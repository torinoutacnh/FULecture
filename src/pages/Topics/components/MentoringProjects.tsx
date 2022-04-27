import React, { useRef, useState } from 'react';
import {
  Button,
  Card,
  Container,
  Stack,
  Typography,
  Grid,
  Breadcrumbs,
  Link,
  Dialog,
  DialogTitle,
  DialogActions,
  Tooltip
} from '@material-ui/core';
import { useNavigate } from 'react-router';
import { HomeOutlined, WhatshotOutlined, DateRangeOutlined, HelpOutline } from '@material-ui/icons';
import Icon from '@iconify/react';

import plusFill from '@iconify/icons-eva/plus-fill';
import ResoTable from 'components/ResoTable/ResoTable';
import { deleteTopicById, editTopic, getTopics } from 'redux/topic/api';
import { useSnackbar } from 'notistack5';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import { useSelector } from 'redux/store';
import useSemester from 'hooks/useSemester';

import { topicColumns } from '../config';
import SearchTopicForm from '../SearchTopicForm';

import { PATH_DASHBOARD } from '../../../routes/paths';

import Page from '../../../components/Page';
import SearchMentoringForm from '../SearchMentoring';
import { projectColumns } from '../projectconfig';

export default function MentoringProjects() {
  const [filters, setFilters] = useState();

  const navigate = useNavigate();
  const tableRef = useRef();

  const [currentDeleteItem, setCurrentDeleteItem] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const semester = useSemester();

  const editTopic = ({ topicId }: any) =>
    navigate(`/${PATH_DASHBOARD.topics.updateTopic}/${topicId}`);
  const onDelete = () =>
    deleteTopicById(currentDeleteItem.topicId)
      .then(tableRef.current?.reload)
      .then((res) => {
        enqueueSnackbar('Delete successfully!', {
          variant: 'success'
        });
      })
      .catch((err) => {
        enqueueSnackbar('Error!', {
          variant: 'error'
        });
      })
      .finally(() => setCurrentDeleteItem(null));
  return (
    <Page title="Dashboard: Mentoring Projects | FCMS">
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
                        navigate(PATH_DASHBOARD.topics.list);
                      }}
                    >
                      <WhatshotOutlined sx={{ mr: 0.5 }} fontSize="inherit" />
                      Mentoring Projects
                    </Link>
                  </Breadcrumbs>
                  <Grid marginTop={1} display="flex" direction="row" alignItems="center">
                    <Typography variant="h5">Mentoring projects of {semester?.name}</Typography>
                    <Tooltip
                      sx={{ ml: 2 }}
                      describeChild
                      title="List projects of lecturers are mentoring in this semester."
                    >
                      <HelpOutline fontSize="small" />
                    </Tooltip>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Stack>
        <Card style={{ padding: '1em' }}>
          <Stack spacing={2}>
            <SearchMentoringForm onChange={setFilters} />
            <ResoTable
              onEdit={editTopic}
              onDelete={setCurrentDeleteItem}
              ref={tableRef}
              pagination
              getData={getTopics}
              filters={filters}
              showAction={false}
              columns={projectColumns}
              rowKey="topicId"
            />
          </Stack>
        </Card>
      </Container>
    </Page>
  );
}
