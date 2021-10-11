import { Button, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useHistory, useParams } from 'react-router';
import * as yup from 'yup';
import { createLoan, getLoanById, updateLoan } from '../../Service/api';
import { validateFormValues } from '../../Utils/validator';
import BookField from '../BookField';
import Input from '../Input';
import SnackBar from '../SnackBar';
import StudentField from '../StudentField';
import { useStyles } from './styles';

export default function LoanForm(props) {
  const schema = yup.object().shape({
    studentId: yup.string().required().nullable(),
    bookId: yup.string().required().nullable(),
    startDate: yup.string().required().test('match', 'A data de inicio deve ser menor que a data final', function (startDate) {
      return startDate <= this.parent.endDate;
    }),
    endDate: yup.string().required()
  });
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const [loan, setLoan] = useState();
  const [snackBarSate, setSnackBarState] = useState({ isOpen: false, isSuccess: false });

  useEffect(() => {
    if (id !== 'new') {
      getLoanById(id)
        .then(response => setLoan(response));
    }
  }, [id]);

  function navigateTo() {
    history.push({
      pathname: '/emprestimos',
      state: {
        openSnackBar: true,
        isSuccess: true
      },
    });
  }

  function changeSnackStatus(isSuccess) {
    if (isSuccess) {
      setSnackBarState({ isOpen: true, isSuccess: true });
      navigateTo();
    } else {
      setSnackBarState({ isOpen: true, isSuccess: false });
    }
  }

  function handleSubmit(loan) {
    if (id !== 'new') {
      updateLoan(loan, id).then(response => changeSnackStatus(response.ok));
    } else {
      createLoan(loan).then(response => changeSnackStatus(response.ok));
    }
  }

  return (
    <>
      <Grid container direction="column" alignItems="center">
        <Grid item xs={9}>
          <Form onSubmit={handleSubmit} validate={validateFormValues(schema)} initialValues={loan}>
            {formProps => (
              <form className={classes.form} onSubmit={formProps.handleSubmit}>
                <Typography className={classes.titleForm} variant="h5">Formulário de Empréstimo</Typography>
                <Grid container direction="row" justifyContent="center" alignItems="center" spacing={1}>
                  <Grid item xs={6}>
                    <Field
                      name="studentId"
                      label="Aluno"
                      component={StudentField}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      name="visitante"
                      label="Visitante"
                      component={Input}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      name="bookId"
                      label="Livro"
                      component={BookField}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Field
                      name="startDate"
                      label="Data de Inicio"
                      component={Input}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Field
                      name="endDate"
                      label="Data Fim"
                      component={Input}
                    />
                  </Grid>
                  <Grid container justifyContent="center">
                    <Button
                      color="primary"
                      variant="outlined"
                      className={classes.button}
                      onClick={() => history.goBack()}
                    >
                      Retornar
                    </Button>
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      className={classes.button}
                    >
                      Salvar
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Form>
        </Grid>
        {snackBarSate.isOpen && (
          <SnackBar
            data={snackBarSate}
            click={() => setSnackBarState({ isOpen: false, isSuccess: false })}
          />
        )}
      </Grid>
    </>
  );
}
