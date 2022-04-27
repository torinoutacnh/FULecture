import { Card, Stack, Typography, CircularProgress } from '@material-ui/core';
import { CardTitle } from 'pages/Products/components/Card';
import SearchInvidualForm from 'pages/WeeklyReport/SearchInvidualForm';
import ResoTable from 'components/ResoTable/ResoTable';
import React, { useRef, useState, useEffect } from 'react';
import { getWeeklyReports } from 'redux/WeeklyReport/api';
import { invidualColumns } from 'pages/WeeklyReport/components/config';
import { useRequest } from 'ahooks';
import { getTeamById } from 'redux/teams/api';
import { getStudentInTeams } from 'redux/StudentInTeams/api';
import { getProjectsById } from 'redux/Projects/api';
import useSemester from 'hooks/useSemester';

function WeeklyTableCard({ projectId, teamId }) {
  const [filters, setFilters] = useState();
  const tableRef = useRef();
  const { semester } = useSemester();
  const {
    run: getTeamData,
    loading: teamLoading,
    data: teamData
  } = useRequest(() => getStudentInTeams({ TeamId: teamId, SemesterId: semester?.semesterId }), {
    formatResult: (res) => res.data.result
  });

  const {
    run: projectRun,
    loading: projectLoading,
    data: projectData
  } = useRequest(() => getProjectsById(projectId), {
    formatResult: (res) => res.data.result
  });

  useEffect(() => {
    if (teamId) {
      getTeamData();
    }
  }, [teamId]);

  useEffect(() => {
    if (projectId) {
      projectRun();
    }
  }, [projectId]);

  return (
    <Card sx={{ mt: 2 }}>
      <CardTitle>
        <Typography variant="h6">Weekly Reports</Typography>
      </CardTitle>
      {projectLoading || teamLoading ? (
        <CircularProgress size={20} />
      ) : (
        <Stack spacing={2}>
          <SearchInvidualForm onChange={setFilters} teamData={teamData} pId={projectId} />
          <ResoTable
            ref={tableRef}
            pagination
            showAction={false}
            getData={getWeeklyReports}
            filters={filters}
            columns={invidualColumns}
            rowKey="id"
          />
        </Stack>
      )}
    </Card>
  );
}

export default WeeklyTableCard;
