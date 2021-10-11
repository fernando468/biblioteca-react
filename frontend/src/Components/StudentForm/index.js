import { Button, Grid, IconButton, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import arrayMutators from 'final-form-arrays';
import React, { useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { useHistory, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { createStudent, getStudentById, updateStudent } from '../../Service/api';
import { validateFormValues } from '../../Utils/validator';
import Input from '../Input';
import SnackBar from '../SnackBar';
import { useStyles } from './styles';

export default function StudentForm(props) {
  const schema = yup.object().shape({
    ra: yup.string().required(),
    name: yup.string().required(),
    email: yup.string().email().required(),
    birthday: yup.string().required(),
    cpf: yup.string().required(),
    phone: yup.string().required(),
    course: yup.string().required(),
    departament: yup.string().required(),

    zip: yup.string().required(),
    street: yup.string().required(),
    city: yup.string().required(),
    number: yup.string().required(),
    neighborhood: yup.string().required(),
    state: yup.string().required(),
    description: '',

  });
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const [snackBarSate, setSnackBarState] = useState({ isOpen: false, isSuccess: false });
  const [initialValues, setInitialValues] = useState(
    {
      ra: '',
      name: '',
      email: '',
      birthday: '',
      cpf: '',
      phone: '',
      course: '',
      departament: '',

      zip: '',
      street: '',
      city: '',
      number: '',
      neighborhood: '',
      state: '',
      description: ''
    }
  );

  useEffect(() => {
    if (id !== 'new') {
      getStudentById(id)
        .then(response => setInitialValues(response));
    }
  }, [id]);

  function navigateTo() {
    history.push({
      pathname: '/',
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

  function onSubmit(student) {
    if (id !== 'new') {
      updateStudent(student, id).then(response => changeSnackStatus(response.ok));
    } else {
      createStudent(student).then(response => changeSnackStatus(response.ok));
    }
  }

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={9}>
          <Form onSubmit={onSubmit} validate={validateFormValues(schema)} initialValues={initialValues} mutators={{ ...arrayMutators }}>
            {formProps => (
              <form className={classes.form} onSubmit={formProps.handleSubmit}>
                <Typography className={classes.titleForm} variant="h5">Dados Pessoais</Typography>
                <Grid container direction="row" justifyContent="center" alignItems="center" spacing={1}>
                  <Grid item xs={3}>
                    <Field
                      name="ra"
                      label="RA"
                      component={Input}
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <Field
                      name="name"
                      label="Nome"
                      component={Input}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Field
                      name="birthday"
                      label="Data de Nascimento"
                      component={Input}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Field
                      name="cpf"
                      label="CPF"
                      component={Input}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Field
                      name="phone"
                      label="Telefone"
                      component={Input}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Field
                      name="email"
                      label="Email"
                      component={Input}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <Field
                      name="course"
                      label="Curso"
                      component={Input}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Field
                      name="departament"
                      label="Departamento"
                      component={Input}
                    />
                  </Grid>
                </Grid>

                <Typography className={classes.titleForm} variant="h5">Endereço</Typography>
                <Grid container direction="row" spacing={1}>
                  <Grid item xs={3}>
                    <Field
                      name="zip"
                      label="CEP"
                      component={Input}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      name="street"
                      label="Endereço"
                      component={Input}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Field
                      name="number"
                      label="Número"
                      component={Input}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Field
                      name="neighborhood"
                      label="Bairro"
                      component={Input}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      name="city"
                      label="Cidade"
                      component={Input}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Field
                      name="state"
                      label="Estado"
                      component={Input}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="description"
                      label="Complemento"
                      component={Input}
                    />
                  </Grid>
                </Grid>
                <Typography className={classes.titleForm} variant="h5">Responsáveis</Typography>
                <Grid container direction="row" alignItems="center" spacing={1}>

                  <Grid item>
                    <Button
                      type="button"
                      color="primary"
                      variant="contained"
                      onClick={() => formProps.form.mutators.push('contacts', {})}
                    >
                      Adicionar
                    </Button>
                  </Grid>
                </Grid>
                <FieldArray name="contacts">
                  {({ fields }) => (
                    <>
                      {fields.length > 0 && <Typography className={classes.titleForm}>Responsáveis</Typography>}
                      <Grid container direction="row" alignItems="center" spacing={1}>
                        {fields.map((name, index) => (
                          <React.Fragment key={index}>
                            <Grid item xs={5}>
                              <Field
                                name={`${name}.name`}
                                label="Nome"
                                component={Input}
                              />
                            </Grid>
                            <Grid item xs={3}>
                              <Field
                                name={`${name}.relation`}
                                label="Relação"
                                component={Input}
                              />
                            </Grid>
                            <Grid item xs={3}>
                              <Field
                                name={`${name}.phone`}
                                label="Telefone"
                                component={Input}
                              />
                            </Grid>
                            <IconButton className={classes.iconDelete} onClick={() => fields.remove(index)}>
                              <DeleteIcon />
                            </IconButton>
                          </React.Fragment>
                        ))}
                      </Grid>
                    </>
                  )}
                </FieldArray>
                <Grid container justifyContent="center">
                  <Button
                    className={classes.button}
                    onClick={() => history.goBack()}
                    variant="outlined"
                    color="primary"
                  >
                    Retornar
                  </Button>
                  <Button
                    className={classes.button}
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Salvar
                  </Button>
                </Grid>
              </form>
            )}
          </Form>
        </Grid>
      </Grid>
      {snackBarSate.isOpen && (
        <SnackBar
          data={snackBarSate}
          click={() => setSnackBarState({ isOpen: false, isSuccess: false })}
        />
      )}
    </ >
  );
}
