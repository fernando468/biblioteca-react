import { TextField } from '@material-ui/core';
import React from 'react';

export default function Input(props) {
  const errorMessage = props?.meta?.error;
  const shoudShowError = !!errorMessage && props?.meta?.touched;

  const value = props?.input?.value;
  const onChange = ev => props?.input?.onChange(ev?.target?.value);

  return (
    <>
      <TextField
        label={props.label}
        value={value}
        onChange={onChange}
        variant={props.variant || 'outlined'}
        fullWidth
        error={shoudShowError}
        {...props}
        {...props?.input}
      />
      <span style={{ color: '#ff0000', display: 'flex' }}>
        {shoudShowError && errorMessage}
      </span>
    </>
  );
}
