import React, { ReactNode, createContext, useEffect } from 'react';
// hooks
import { useRequest } from 'ahooks';
import useAuth from 'hooks/useAuth';
import useLocalStorage from '../hooks/useLocalStorage';
// theme
import palette from '../theme/palette';
// @type
import { ThemeMode, ThemeDirection, ThemeColor, SettingsContextProps } from '../@types/settings';

import { getSemesters } from '../pages/Semesters/SelectedListApi';
import { TSemester } from '../types/semester';

// ----------------------------------------------------------------------

const initialState: any = {
  semester: null,
  chooseSemester: () => {}
};

const SemesterContext = createContext(initialState);

type SemesterProviderProps = {
  children: ReactNode;
};

function SemesterProvider({ children }: SemesterProviderProps) {
  const { run, data: semestersData = [] } = useRequest(() => getSemesters({ page: 1, limit: 3 }), {
    formatResult: (res) => res.data.result
  });

  useEffect(() => {
    if (semester == undefined) {
      setSemester(semestersData[0]);
    }
  }, [semestersData]);

  const [semester, setSemester] = useLocalStorage('semesterLocal', semestersData[0]);

  const chooseSemester = (semester: TSemester) => {
    setSemester(semester);
  };

  return (
    <SemesterContext.Provider
      value={{
        ...semester,
        semester: {
          semesterId: semester?.semesterId,
          name: semester?.name,
          status: semester?.status,
          assingningDate: semester?.assingningDate,
          inProgressDate: semester?.inProgressDate,
          finishedDate: semester?.finishedDate,
          maxProject: semester?.maxProject,
          marginPass: semester?.marginPass
        },
        chooseSemester
      }}
    >
      {children}
    </SemesterContext.Provider>
  );
}

export { SemesterProvider, SemesterContext };
