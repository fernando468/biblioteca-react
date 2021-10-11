import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import BookForm from '../Components/BookForm';
import BookList from '../Components/BookList';
import LoanForm from '../Components/LoanForm';
import LoanList from '../Components/LoanList';
import SideBar from '../Components/SideBar';
import StudentForm from '../Components/StudentForm';
import StudentList from '../Components/StudentList';

export default function Routes(props) {
  return (
    <Router>
      <Switch>
        <SideBar setToken={props.setToken}>
          <Route path="/alunos" component={StudentList} />
          <Route path="/aluno/:id" component={StudentForm} />
          <Route path="/livros" component={BookList} />
          <Route path="/livro/:id" component={BookForm} />
          <Route path="/emprestimos" component={LoanList} />
          <Route path="/emprestimo/:id" component={LoanForm} />
          <Route exact path="/" component={StudentList} />
        </SideBar>
      </Switch>
    </Router>
  );
}
