import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import React, { useState } from 'react';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SnackBar({ data, click }) {
  const { isOpen, isSuccess } = data;
  const message = isSuccess ? 'Solicitação realizada com sucesso' : 'Ocorreu ao realizar a solicitação';
  const [open, setOpen] = useState(isOpen);

  const handleClose = (event, reason) => {
    click();
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={isSuccess ? 'success' : 'error'}>{message}</Alert>
    </Snackbar>
  );
}
