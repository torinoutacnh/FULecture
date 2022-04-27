import { Card, CircularProgress, Grid, Typography } from '@material-ui/core';
import { useRequest } from 'ahooks';
import React, { useEffect } from 'react';
import { getLecturerGroupById } from '../../../redux/LecturerGroups/api';

function MentorsTopicCard({ groupId }: any) {
  const { data, run, loading } = useRequest(() => getLecturerGroupById(groupId!), {
    refreshDeps: [groupId],
    formatResult: (res) => res.data
  });

  useEffect(() => {
    if (groupId) {
      run();
    }
  }, [groupId]);

  return (
    <Card style={{ marginLeft: '20px' }}>
      <Grid
        direction="row"
        display="flex"
        style={{
          minHeight: '120px',
          padding: '10px'
        }}
      >
        <Grid direction="column" display="flex">
          <Grid direction="row" display="flex">
            <Grid direction="column" style={{ minWidth: '140px' }} display="flex">
              <Grid direction="row">
                <Typography variant="subtitle1">Mentors of this topic</Typography>
              </Grid>
              <Grid direction="row" sx={{ mt: 0.5 }}>
                <Typography style={{ fontSize: '12px', color: 'grey', opacity: 0.7 }}>
                  {data?.name}
                </Typography>
              </Grid>
              {loading ? (
                <CircularProgress size={20} />
              ) : (
                <>
                  {data != null ? (
                    <Grid sx={{ mt: 1 }} direction="row" display="flex">
                      <Typography sx={{ mr: 1 }} variant="body2">
                        Mentors:
                      </Typography>
                      <Grid display="flex" direction="column" sx={{ ml: 2 }}>
                        {data?.lecturerGroupMembersDetails?.map(({ lecturerId, name }) => (
                          <Typography sx={{ mr: 1 }} key={lecturerId} variant="subtitle2">
                            {name}
                          </Typography>
                        ))}
                      </Grid>
                    </Grid>
                  ) : (
                    <Typography sx={{ mt: 1 }} variant="body2">
                      This topic do not have mentors!
                    </Typography>
                  )}
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

export default MentorsTopicCard;
