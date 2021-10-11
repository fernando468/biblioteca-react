import { Button, Card, CardActions, CardContent, Grid, IconButton, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Pagination from '@material-ui/lab/Pagination';
import React, { useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useHistory, useLocation } from 'react-router';
import { deleteBookById, searchBooks } from '../../Service/api';
import Input from '../Input';
import SnackBar from '../SnackBar';
import { useStyles } from './styles';

export default function BookList() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState({});
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState();
  const [snackBarSate, setSnackBarState] = useState({ isOpen: false, isSuccess: false });

  useEffect(() => {
    if(location.state?.openSnackBar) {
      changeSnackStatus(location.state.isSuccess);
    }
  }, []);

  function getBooks(params) {
    searchBooks(params)
      .then(response => {
        setTotalNumberOfPages(Math.ceil(response.total / 10));
        setBooks(response.data);
      });
  }

  useEffect(() => {
    getBooks(filter);
  }, [filter]);

  function handleFilter(params) {
    setFilter(params);
  }

  function handleEdit(id) {
    history.push(`/livro/${id}`, { id });
  }

  function changeSnackStatus(isSuccess) {
    if (isSuccess) {
      setSnackBarState({ isOpen: true, isSuccess: true });
    } else {
      setSnackBarState({ isOpen: true, isSuccess: false });
    }
  }

  function handleDelete(id) {
    deleteBookById(id)
      .then(response => {
        getBooks(filter);
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
          <Typography variant="h5">Buscar Livro</Typography>
          <Typography variant="subtitle1">Filtrar Por</Typography>
          <Grid item>
            <Form onSubmit={handleFilter} initialValues={filter}>
              {formProps => (
                <form className={classes.form} onSubmit={formProps.handleSubmit}>
                  <Grid container direction="row" justifyContent="center" spacing={1}>
                    <Grid item xs={8}>
                      <Field name="title" label="Titulo" component={Input} />
                    </Grid>
                    <Grid item xs={4}>
                      <Field name="cod" label="Código" component={Input} />
                    </Grid>
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
                    <Grid item xs={3}>
                      <Button
                        onClick={() => history.push('/livro/new')}
                        className={classes.button}
                        variant="contained"
                        color="primary"
                      >
                        Adicionar Livro
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Form>
            {books?.map(book => {
              return (
                <Card key={book.id} className={classes.card} variant="elevation">
                  <CardContent>
                    <Typography variant="h5" component="h2">Titulo: {book.title}</Typography>
                    <Typography>Edição: {book.edtion}</Typography>
                    <Typography>Autores: {book.authors}</Typography>
                    <Typography color="textSecondary" variant="body2" component="p">ISBN: {book.isbn}</Typography>
                    <Typography color="textSecondary" variant="body2" component="p">Código: {book.cdd}</Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton aria-label="delete" onClick={() => handleDelete(book.id)} className={classes.iconDelete}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="edit" onClick={() => handleEdit(book.id)} className={classes.margin}>
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
