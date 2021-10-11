import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  IconButton, Typography
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Pagination from '@material-ui/lab/Pagination';
import React, { useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useHistory, useLocation } from 'react-router-dom';
import { deleteStudentById, searchStudents } from '../../Service/api';
import Input from '../Input';
import SnackBar from '../SnackBar';
import { useStyles } from './styles';

export default function StudentList() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState({});
  const [expanded, setExpanded] = useState(false);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState();
  const [snackBarSate, setSnackBarState] = useState({ isOpen: false, isSuccess: false });

  useEffect(() => {
    if(location.state?.openSnackBar) {
      changeSnackStatus(location.state.isSuccess);
    }
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  function getStudents(params) {
    searchStudents(params)
      .then(response => {
        setTotalNumberOfPages(Math.ceil(response.total / 10));
        setStudents(response.data);
      });
  }

  useEffect(() => {
    getStudents(filter);
  }, [filter, currentPageNumber]);

  function handleFilter(params) {
    setFilter(params);
  }

  function handleEdit(id) {
    history.push(`/aluno/${id}`, { id });
  }

  function changeSnackStatus(isSuccess) {
    if (isSuccess) {
      setSnackBarState({ isOpen: true, isSuccess: true });
    } else {
      setSnackBarState({ isOpen: true, isSuccess: false });
    }
  }

  function handleDelete(id) {
    deleteStudentById(id)
      .then(response => {
        changeSnackStatus(response.ok);
        getStudents(filter);
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
          <Typography variant="h5">Buscar Aluno</Typography>
          <Typography variant="subtitle1">Filtrar Por</Typography>

          <Grid item>
            <Form onSubmit={handleFilter} initialValues={filter}>
              {formProps => (
                <form onSubmit={formProps.handleSubmit}>
                  <Grid container direction="row" justifyContent="center" spacing={3}>
                    <Grid item xs={6}>
                      <Field name="name" label="Nome" component={Input} />
                    </Grid>
                    <Grid item xs={3}>
                      <Field name="cpf" label="CPF" component={Input} />
                    </Grid>
                    <Grid item xs={3}>
                      <Field name="ra" label="RA" component={Input} />
                    </Grid>
                    <Grid item xs={2}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        Filtrar
                      </Button>
                    </Grid>
                    <Grid item xs={3}>
                      <Button
                        onClick={() => history.push('/aluno/new')}
                        variant="contained"
                        color="primary"
                      >
                        Adicionar Aluno
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Form>
            <div className={classes.list}>
              {students?.map((student, index) => (
                <Accordion className={classes.accordion} key={student.id} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography style={{ width: '40%' }}><strong>{student.name}</strong></Typography>
                    <Typography style={{ width: '20%', color: '#c2c2c2' }}>{student.cpf}</Typography>
                    <Typography style={{ width: '40%', color: '#c2c2c2' }}>{student.course}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container direction="column">
                      <Typography><strong> RA: </strong> {student.ra}</Typography>
                      <Typography><strong> CPF: </strong> {student.cpf}</Typography>
                      <Typography><strong> Telefone: </strong>{student.phone}</Typography>
                      <Typography><strong> Email: </strong>{student.email}</Typography>
                      <Typography><strong> Data de Nascimento: </strong> {student.birthday}</Typography>
                      <Typography><strong> Curso: </strong> {student.course}</Typography>
                      <Typography><strong> Departamento: </strong> {student.departament}</Typography>
                      <Typography><strong> Endereço: </strong> {student.city} - {student.state}</Typography>
                      <Typography className={classes.titleRelations}>Responsáveis</Typography>
                      {student.contacts.map(contact => (
                        <React.Fragment key={contact.id}>
                          <Typography className={classes.descriptionRelations}><strong> Nome: </strong> {contact.name}</Typography>
                          <Typography><strong> Relação: </strong> {contact.relation}</Typography>
                          <Typography><strong> Telefone: </strong> {contact.phone}</Typography>
                        </React.Fragment>
                      ))}
                    </Grid>
                    <Grid container alignItems="center" justifyContent="flex-end">
                      <Grid item>
                        <IconButton color="secondary" onClick={() => handleDelete(student.id)} aria-label="delete">
                          <DeleteIcon className={classes.iconDelete} />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <IconButton onClick={() => handleEdit(student.id)} aria-label="edit">
                          <EditIcon />
                        </IconButton>
                      </Grid>

                    </Grid>
                  </AccordionDetails>
                </Accordion>
              ))}
              <Pagination className={classes.alignCenter} color="primary" count={totalNumberOfPages} page={currentPageNumber} onChange={handlePageChange} />
            </div>
          </Grid>
        </div>
      </Grid>
      {snackBarSate.isOpen && (
        <SnackBar
          data={snackBarSate}
          click={() => setSnackBarState({ isOpen: false, isSuccess: false })}
        />
      )}
    </>
  );
}
