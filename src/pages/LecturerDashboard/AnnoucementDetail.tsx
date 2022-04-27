import { Breadcrumbs, Card, Container, Grid, Link, Stack, Typography } from '@material-ui/core';
import { useRequest } from 'ahooks';
import Page from 'components/Page';
import { useNavigate } from 'react-router';
import {
  DateRangeOutlined,
  GrainOutlined,
  HomeOutlined,
  WhatshotOutlined
} from '@material-ui/icons';
import useSemester from 'hooks/useSemester';
import { PATH_DASHBOARD } from 'routes/paths';
import { CardTitle } from 'pages/Products/components/Card';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { QuillEditor } from 'components/editor';
import { getAnnoucementById } from '../../redux/announcements/api';
import AnnouncementBoard from './components/AnnouncementBoard';

function AnnoucementDetail() {
  const { id } = useParams();
  const [announcement, setAnnoucement] = useState();
  const navigate = useNavigate();
  const { semester } = useSemester();

  useEffect(() => {
    getAnnoucementById(id!).then((res) => {
      setAnnoucement(res.data);
    });
  }, [id]);

  return (
    <Page title="Announcement Detail | FCMS">
      <Container style={{ minWidth: '95%' }}>
        <Stack display="flex" direction="row">
          <Grid direction="row" display="flex" xs={7} sx={{ ml: 1 }}>
            <Grid item>
              <Grid direction="column">
                <Grid role="presentation">
                  <Breadcrumbs aria-label="breadcrumb">
                    <Link
                      underline="hover"
                      sx={{ display: 'flex', alignItems: 'center' }}
                      color="inherit"
                      href="#"
                      onClick={() => {
                        navigate(PATH_DASHBOARD.root);
                      }}
                    >
                      <HomeOutlined sx={{ mr: 0.5 }} fontSize="inherit" />
                      Semester
                    </Link>
                    <Link sx={{ display: 'flex', alignItems: 'center' }} color="inherit" href="#">
                      <DateRangeOutlined sx={{ mr: 0.5 }} fontSize="inherit" />
                      {semester?.name}
                    </Link>
                    <Link
                      underline="hover"
                      sx={{ display: 'flex', alignItems: 'center' }}
                      color="inherit"
                      href="#"
                      onClick={() => {
                        navigate(PATH_DASHBOARD.projects.list);
                      }}
                    >
                      <WhatshotOutlined sx={{ mr: 0.5 }} fontSize="inherit" />
                      Announcements
                    </Link>
                  </Breadcrumbs>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Stack>
        <Grid display="flex" direction="row" sx={{ mt: 2 }}>
          <Typography variant="h5">Annoucement Detail</Typography>
        </Grid>
        <Stack display="flex" direction="row" sx={{ mt: 2 }} spacing={5}>
          <Grid xs={8} display="flex" direction="column">
            <Card>
              <CardTitle>
                <Typography variant="h6" style={{ wordWrap: 'break-word', color: '#004175' }}>
                  {' '}
                  {announcement?.title}
                </Typography>
                <Typography variant="body2">
                  {' '}
                  {new Date(announcement?.createdAt).toLocaleDateString()},{' '}
                  {new Date(announcement?.createdAt).toLocaleTimeString()}
                </Typography>
              </CardTitle>

              <QuillEditor
                value={announcement?.content}
                readOnly={true}
                toolBar={false}
                theme={false}
              />
            </Card>
          </Grid>
          <Grid
            xs={4}
            sx={{ mt: 2 }}
            display="flex"
            direction="column"
            style={{ minHeight: '60vh' }}
          >
            <AnnouncementBoard />
          </Grid>
        </Stack>
      </Container>
    </Page>
  );
}

export default AnnoucementDetail;
