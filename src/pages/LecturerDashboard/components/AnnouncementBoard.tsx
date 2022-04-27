import { Card, CircularProgress, Divider, Grid, Link, Stack, Typography } from '@material-ui/core';
import { Announcement, Visibility } from '@material-ui/icons';
import { useRequest } from 'ahooks';
import { CardTitle } from 'pages/Products/components/Card';
import React, { useEffect, useState, useMemo } from 'react';
import { LoadingButton } from '@material-ui/lab';
import { PATH_DASHBOARD } from 'routes/paths';
import moment from 'moment';

import { getAnnoucements } from '../../../redux/announcements/api';
import { TAnnouncements } from '../../../types/announcements';
import useSemester from '../../../hooks/useSemester';

function AnnouncementBoard() {
  const { semester } = useSemester();
  const [currentSemesterId, setCurrentSemesterId] = useState<any>();

  const { data, run, loading } = useRequest(
    () => getAnnoucements({ userRole: 1, semesterId: semester.semesterId }),
    {
      refreshDeps: [1],
      formatResult: (res) => res.data.result
    }
  );
  useMemo(() => {
    if (semester?.semesterId) {
      run();
    }
  }, [semester?.semesterId]);
  return (
    <Card style={{ width: '100%' }}>
      <CardTitle>
        <Typography variant="subtitle1">Annoucements</Typography>
      </CardTitle>

      <Stack
        sx={{ mt: 1 }}
        display="flex"
        direction="column"
        style={{ overflow: 'scroll', maxHeight: '250px' }}
      >
        {loading ? (
          <CircularProgress size={20} />
        ) : (
          <>
            {data?.map((item: TAnnouncements) => (
              <Grid key={item.announcementId} display="flex" direction="row" sx={{ mb: 2 }}>
                <Grid display="flex" direction="column">
                  <Link
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="inherit"
                    href={`${PATH_DASHBOARD.announcement.detail}/${item.announcementId}`}
                  >
                    <Typography
                      style={{ wordWrap: 'break-word', color: '#004175' }}
                      variant="subtitle2"
                    >
                      {item?.title}
                    </Typography>
                  </Link>

                  {item.createdAt > item.updatedAt ? (
                    <Typography style={{ fontSize: '12px', color: 'grey', opacity: '0.9' }}>
                      {moment(new Date(item?.createdAt)).format('DD MMMM, YYYY')}
                    </Typography>
                  ) : (
                    <Typography style={{ fontSize: '13px', color: 'grey', opacity: '0.9' }}>
                      {moment(new Date(item?.updatedAt)).format('DD MMMM, YYYY')} (updated)
                    </Typography>
                  )}

                  <Divider sx={{ mt: 2 }} style={{ width: '100%' }} />
                </Grid>
                {/* <Grid xs={1} display="flex" direction="column">
                  <LoadingButton
                    href={`${PATH_DASHBOARD.announcement.detail}/${item.announcementId}`}
                  >
                    <Visibility />
                  </LoadingButton>
                </Grid> */}
              </Grid>
            ))}
          </>
        )}
      </Stack>
    </Card>
  );
}

export default AnnouncementBoard;
