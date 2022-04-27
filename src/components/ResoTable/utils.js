import { TableCell } from '@material-ui/core';

export const getCellValue = (cell, ...args) => {
  switch (typeof cell) {
    case 'string':
      return cell;
    case 'function':
      return cell(...args);
    default:
      return '-';
  }
};
