import React from 'react';
import { Button, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function StudentTable(props) {
  const { students, canEditAttendance, onAttendanceChange, onDeleteStudent, onAddStudent } = props;

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>姓名</TableCell>
              <TableCell>出勤</TableCell>
              {canEditAttendance && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={student.present}
                    onChange={() => onAttendanceChange(student.id)}
                    disabled={!canEditAttendance}
                  />
                </TableCell>
                {canEditAttendance && (
                  <TableCell>
                    <Button onClick={() => onDeleteStudent(student.id)}>Delete</Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        {canEditAttendance && <Button onClick={onAddStudent}>添加学生</Button>}
    </div>
  );
}

export default StudentTable;