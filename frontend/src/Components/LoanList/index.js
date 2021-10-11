import { Button, Card, CardActions, CardContent, Grid, IconButton, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Pagination } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useHistory, useLocation } from 'react-router';
import { deleteLoanById, searchLoans } from '../../Service/api';
import BookField from '../BookField';
import Input from '../Input';
import SnackBar from '../SnackBar';
import StudentField from '../StudentField';
import { useStyles } from './styles';

export default function LoanList() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [loans, setLoans] = useState([]);
  const [filter, setFilter] = useState({});
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState();
  const [snackBarSate, setSnackBarState] = useState({ isOpen: false, isSuccess: false });

  useEffect(() => {
    if (location.state?.openSnackBar) {
      console.log(location.state);
      changeSnackStatus(location.state.isSuccess);
    }
  }, []);

  function getLoans(params) {
    searchLoans(params)
      .then(response => {
        setTotalNumberOfPages(Math.ceil(response.total / 10));
        setLoans(response.data);
      });
  }

  useEffect(() => {
    getLoans(filter);
  }, [filter]);

  function handleFilter(params) {
    setFilter(params);
  }

  function changeSnackStatus(isSuccess) {
    if (isSuccess) {
      setSnackBarState({ isOpen: true, isSuccess: true });
    } else {
      setSnackBarState({ isOpen: true, isSuccess: false });
    }
  }

  function handleDelete(id) {
    deleteLoanById(id)
      .then(response => {
        getLoans(filter);
        changeSnackStatus(response.ok);
      });
  }

  function handlePageChange(event, value) {
    setFilter({ ...filter, $skip: (value - 1) * 10 });
    setCurrentPageNumber(value);
  }

  return (
    <>
      <Grid container direction="column" alignItems="center">
        <div style={{ width: '75%' }}>
          <Typography variant="h5">Buscar Empréstimo</Typography>
          <Typography variant="subtitle1">Filtrar Por: </Typography>
          <Grid item>
            <Form onSubmit={handleFilter} initialValues={filter}>
              {formProps => (
                <form onSubmit={formProps.handleSubmit}>
                  <Grid container direction="row" justifyContent="center" alignItems="center" spacing={1}>
                    <Grid item xs={4}>
                      <Field
                        name="studentId"
                        label="Aluno"
                        component={StudentField}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Field
                        name="visitante"
                        label="Visitante"
                        component={Input}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Field
                        name="bookId"
                        label="Livro"
                        component={BookField}
                      />
                    </Grid>
                    <Grid container justifyContent="center">
                      <Grid item xs={2}>
                        <Button
                          className={classes.button}
                          type="submit"
                          variant="contained"
                          color="primary"
                        >
                          Filtrar
                        </Button>
                      </Grid>
                      <Grid item xs={4}>
                        <Button
                          onClick={() => history.push('/emprestimo/new')}
                          className={classes.button}
                          variant="contained"
                          color="primary"
                        >
                          Adicionar Empréstimo
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Form>
            {loans?.map(loan => {
              return (
                <Card key={loan.id} className={classes.card} variant="elevation">
                  <CardContent>
                    <Typography variant="h5" component="h6">Livro: {loan.book?.title}</Typography>
                    <Typography variant="h6" component="h6">Nome: {loan.student?.name}</Typography>
                    <Typography color="textSecondary" variant="body2" component="p">Email: {loan.student?.email}</Typography>
                    <Typography color="textSecondary" variant="body2" component="p">Data de Inicio: {loan.startDate}</Typography>
                    <Typography color="textSecondary" variant="body2" component="p">Data Fim: {loan.endDate}</Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton aria-label="delete" onClick={() => handleDelete(loan.id)} className={classes.iconDelete}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      aria-label="edit"
                      onClick={() => history.push(`/emprestimo/${loan.id}`)}
                      className={classes.margin}
                    >
                      <EditIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              );
            })}
            <Pagination className={classes.alignCenter} color="primary" count={totalNumberOfPages} page={currentPageNumber} onChange={handlePageChange} />
          </Grid>
        </div>
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
