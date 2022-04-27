import { SemesterContext } from 'contexts/SemesterContext';
import { useContext } from 'react';

// ----------------------------------------------------------------------

const useSemester = () => useContext(SemesterContext);

export default useSemester;
