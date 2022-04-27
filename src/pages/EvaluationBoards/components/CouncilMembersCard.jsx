import { Card, Grid, Stack, Typography } from '@material-ui/core';
import { useRequest } from 'ahooks';
import Label from 'components/Label';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { getLecturerGroupMembers } from 'redux/LecturerGroupMember/api';
import { getLecturerGroupById } from 'redux/LecturerGroups/api';

function CouncilMembersCard({ id }: any) {
  const { data: councilMembers, run } = useRequest(
    () => getLecturerGroupMembers({ LecturerGroupId: id }),
    {
      refreshDeps: [id],
      formatResult: (res) => {
        console.log(res.data.result);
        return res.data.result;
      }
    }
  );
  useEffect(() => {
    if (id) {
      run();
    }
  }, [id]);

  console.log('currentLecturerGroup', councilMembers);
  return (
    <Card
      style={{
        boxShadow: '20',
        height: '250px',
        width: '100%'
      }}
    >
      <Typography variant="h6">Council members</Typography>
      <Stack direction="row" display="flex" height="200px" overflow="scroll">
        {councilMembers?.map((data) => (
          <Grid
            display="flex"
            style={{ margin: '20px' }}
            justifyContent="center"
            value={data.code}
            key={data.code}
          >
            <Card
              style={{
                borderRadius: '26px'
              }}
              component="span"
              sx={{ width: 300, minHeight: 150, boxShadow: 16 }}
              spacing={5}
            >
              <Grid display="flex" direction="row">
                <Grid display="flex" direction="column" xs={10}>
                  <Typography sx={{ mt: 1 }} variant="subtitle1">
                    {data?.lecturer.name}
                  </Typography>
                  <Typography sx={{ mt: 1 }} variant="body1">
                    {data?.lecturer.email}
                  </Typography>
                  <Grid display="flex" direction="row" sx={{ mt: 1 }}>
                    {data?.lecturer.lecturerCriteria?.map((item) => (
                      <Typography
                        style={{ fontSize: '14px', color: 'grey', opacity: '0.9' }}
                        sx={{ mr: 1 }}
                        key={item.criterionId}
                      >
                        {item?.criterion?.name}
                      </Typography>
                    ))}
                  </Grid>
                  <Grid xs={3} sx={{ mt: 1 }}>
                    {data?.isLeader === true ? <Label color="error">President</Label> : ''}
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Stack>
    </Card>
  );
}

export default CouncilMembersCard;
