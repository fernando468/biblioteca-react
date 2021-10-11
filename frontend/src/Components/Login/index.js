import { Button, Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import * as yup from 'yup';
import { login } from '../../Service/api';
import { validateFormValues } from '../../Utils/validator';
import Input from '../Input';
import SnackBar from '../SnackBar';
import { useStyles } from './styles';

export default function Login(props) {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required()
  });
  const classes = useStyles();
  const [user, setUser] = useState({ email: 'usuario@email.com', password: '123' });
  const [snackBarSate, setSnackBarState] = useState({ isOpen: false, isSuccess: false });
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(user) {
    setIsLoading(true);
    login(user)
      .then(response => {
        if (response.ok) {
          props.setToken(response.data.accessToken);
        } else {
          setSnackBarState({ isOpen: true, isSuccess: false });
        }
        setIsLoading(false);
      });
  }

  return (
    <div className={classes.container}>
      <Form onSubmit={handleSubmit} validate={validateFormValues(schema)} initialValues={user}>
        {formProps => (
          <form className={classes.form} onSubmit={formProps.handleSubmit}>
            <Typography className={classes.titleForm} variant="h2">Login</Typography>
            <Grid item xs={12}>
              <Field
                name="email"
                label="Email"
                component={Input}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name="password"
                label="Senha"
                component={Input}
                type="password"
              />
            </Grid>
            <Grid item xs={12}>

              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={isLoading}
                className={classes.button}
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </Grid>
          </form>
        )}
      </Form>
      {snackBarSate.isOpen && (
        <SnackBar
          data={snackBarSate}
          click={() => setSnackBarState({ isOpen: false, isSuccess: false })}
        />
      )}
    </div>
  );
}
