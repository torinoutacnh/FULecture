import { Card, LinearProgress, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { GanttComponent, TaskFieldsModel } from '@syncfusion/ej2-react-gantt';
import { useParams } from 'react-router-dom';
import data from '@iconify/icons-eva/code-fill';
import { useRequest } from 'ahooks';

import { getProcesses } from '../../../redux/Process/api';
import { TProcess } from '../../../types/process';
import { getProjectProcesses } from '../../../redux/ProjectProcess/api';
import useSemester from '../../../hooks/useSemester';

function ProcessChart({ project }: any) {
  const { semester } = useSemester();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [processCount, setProcessCount] = useState<number>(0);
  const TaskValues: TaskFieldsModel = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    // duration: 'Duration',
    child: 'Subtasks'
  };

  const [ganttData, setGanttData] = useState<any[]>([]);

  useEffect(() => {
    const DataChart = new Array<any>();
    getProcesses({ departmentId: project, semesterId: semester?.semesterId, processMode: 1 }).then(
      (res) => {
        if (res.data.result) {
          res.data.result?.map((process: TProcess, processIndex: number) => {
            const activities = Array<any>();
            process.activities.map((activity: any, activityIndex: number) => {
              const activityData = {
                TaskID: activityIndex + 1,
                TaskName: activity.name,
                StartDate: new Date(activity.startTime),
                EndDate: new Date(activity.endTime)
                // Duration: diffDays
              };
              activities.push(activityData);
            });
            const processData = {
              TaskID: processIndex + 1,
              TaskName: process.name,
              StartDate: new Date(process.startTime),
              EndDate: new Date(process.endTime),
              // Duration: diffDays,
              Subtasks: activities
            };
            DataChart.push(processData);
          });
          setProcessCount(res.data.result.length);
        }
        setGanttData(DataChart);
        setIsLoading(false);
      }
    );
  }, [project]);

  if (isLoading) {
    return <LinearProgress />;
  }

  if (isLoading === false && ganttData.length === 0) {
    return <Typography variant="subtitle2">This has no process now!</Typography>;
  }

  return (
    <>
      <GanttComponent dataSource={ganttData} taskFields={TaskValues} />
    </>
  );
}

export default ProcessChart;
