import { Button, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useHistory, useParams } from 'react-router';
import * as yup from 'yup';
import { createBook, getBookById, updateBook } from '../../Service/api';
import { validateFormValues } from '../../Utils/validator';
import Input from '../Input';
import SnackBar from '../SnackBar';
import { useStyles } from './styles';

export default function BookForm(props) {
  const schema = yup.object().shape({
    title: yup.string().required(),
    yearOfPublication: yup.string().required(),
    publisher: yup.string().required(),
    edtion: yup.string().required(),
    authors: yup.string().required(),
    volume: yup.string().required(),
    isbn: yup.string().required(),
    cdd: yup.string().required(),
    cod: yup.string().required()
  });
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const [snackBarSate, setSnackBarState] = useState({ isOpen: false, isSuccess: false });
  const [book, setBook] = useState({
    title: '',
    yearOfPublication: '',
    publisher: '',
    edtion: '',
    authors: '',
    volume: '',
    isbn: '',
    cdd: '',
    cod: ''
  });

  useEffect(() => {
    if (id !== 'new') {
      getBookById(id)
        .then(response => setBook(response));
    }
  }, [id]);

  function navigateTo() {
    history.push({
      pathname: '/livros',
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

  function onSubmit(book) {
    if (id !== 'new') {
      updateBook(book, id).then(response => changeSnackStatus(response.ok));
    } else {
      createBook(book).then(response => changeSnackStatus(response.ok));
    }
  }

  return (
    <>
      <Grid container direction="column" alignItems="center">
        <Grid item xs={9}>
          <Form onSubmit={onSubmit} validate={validateFormValues(schema)} initialValues={book}>
            {formProps => (
              <form className={classes.form} onSubmit={formProps.handleSubmit}>
                <Typography className={classes.titleForm} variant="h5">Dados do Livro</Typography>
                <Grid container direction="row" justifyContent="center" alignItems="center" spacing={1}>
                  <Grid item xs={10}>
                    <Field
                      name="title"
                      label="Titulo"
                      component={Input}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Field
                      name="yearOfPublication"
                      label="Ano de Publicação"
                      component={Input}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      name="publisher"
                      label="Editora"
                      component={Input}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Field
                      name="edtion"
                      label="Edição"
                      component={Input}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Field
                      name="volume"
                      label="Volume"
                      component={Input}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="authors"
                      label="Autores"
                      component={Input}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Field
                      name="isbn"
                      label="ISBN"
                      component={Input}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Field
                      name="cdd"
                      label="CDD"
                      component={Input}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Field
                      name="cod"
                      label="Código"
                      component={Input}
                    />
                  </Grid>
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
