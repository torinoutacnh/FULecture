import { Card, CircularProgress, Stack, Typography } from '@material-ui/core';
import { CardTitle } from 'pages/Products/components/Card';
import ResoTable from 'components/ResoTable/ResoTable';

import React, { useRef, useState, useEffect } from 'react';
import { getEvidences } from 'redux/evidences/api';
import useSemester from 'hooks/useSemester';
import { useRequest } from 'ahooks';
import { getProjectsById } from 'redux/Projects/api';

import { EvidenceColumns } from './config';
import SearchEvidenceForm from './components/SearchEvidenceForm';

function EvidenceCard({ projectId }) {
  const tableRef = useRef();
  const [filters, setFilters] = useState();
  const { semester } = useSemester();

  const {
    run: projectRun,
    loading: projectLoading,
    data: projectData
  } = useRequest(() => getProjectsById(projectId), {
    formatResult: (res) => res.data.result
  });

  useEffect(() => {
    if (projectId) {
      projectRun();
    }
  }, [projectId]);

  return (
    <Card sx={{ mt: 2 }}>
      <CardTitle>
        <Typography variant="h6">Evidences</Typography>
      </CardTitle>
      {projectLoading ? (
        <CircularProgress size={20} />
      ) : (
        <Stack spacing={2}>
          <SearchEvidenceForm onChange={setFilters} pId={projectId} />
          <ResoTable
            ref={tableRef}
            pagination
            showAction={false}
            getData={getEvidences}
            filters={filters}
            columns={EvidenceColumns}
            rowKey="evidenceId"
          />
        </Stack>
      )}
    </Card>
  );
}

export default EvidenceCard;
