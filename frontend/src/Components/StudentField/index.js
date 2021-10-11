import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { searchStudents } from '../../Service/api';

export default function StudentField(props) {
  const [students, setStudents] = useState([]);
  const errorMessage = props?.meta?.error;
  const shoudShowError = !!errorMessage && props?.meta?.touched;

  useEffect(() => {
    searchStudents({})
      .then(response => setStudents(response.data));
  }, []);

  function idFromStudent(student) {
    return student ? student.id : null;
  }

  function studentFromId(id) {
    return students.find(student => student.id === id) || null;
  }

  return (
    <>
      <Autocomplete
        value={studentFromId(props?.input?.value)}
        onChange={(ev, student) => props?.input?.onChange(idFromStudent(student))}
        options={students}
        getOptionLabel={(student) => student.name || ''}
        renderInput={(params) => <TextField {...params} error={shoudShowError} label={props.label} variant="outlined" />}
      />
      <span style={{ color: '#ff0000', display: 'flex' }}>
        {shoudShowError && errorMessage}
      </span>
    </>
  );
}
