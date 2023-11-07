import React from 'react';
import { TableRow, TableCell, Checkbox, Button } from '@mui/material';

const StudentRow = ({ student, canEditAttendance, handleAttendanceChange, deleteStudent }) => {
  return (
    <TableRow key={student.id}>
      <TableCell>{student.name}</TableCell>
      <TableCell>
        <Checkbox
          checked={student.present}
          onChange={() => handleAttendanceChange(student.id)}
          disabled={!canEditAttendance}
        />
      </TableCell>
      {canEditAttendance && (
        <TableCell>
          <Button onClick={() => deleteStudent(student.id)}>Delete</Button>
        </TableCell>
      )}
    </TableRow>
  );
};

export default StudentRow;