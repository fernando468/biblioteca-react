import { create } from 'apisauce';

const apiUrl = process.env.NODE_ENV === 'production' ? 'https://nodejs-api-painel-biblioteca.herokuapp.com' : 'http://localhost:3000';

const api = create({
  baseURL: apiUrl
});

function getHeaders() {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  };
}

export const createStudent = async (student) => await api.post('/students', student, getHeaders());
export const searchStudents = params => api.get('/students', params, getHeaders()).then(response => response.data);
export const getStudentById = id => api.get(`/students/${id}`, {}, getHeaders()).then(response => response.data);
export const updateStudent = async (student, id) => await api.put(`/students/${id}`, student, getHeaders());
export const deleteStudentById = async (id) => await api.delete(`/students/${id}`, {}, getHeaders());

export const createBook = async (book) => await api.post('/books', book, getHeaders());
export const searchBooks = (params) => api.get('/books', params, getHeaders()).then(response => response.data);
export const getBookById = id => api.get(`/books/${id}`, {}, getHeaders()).then(response => response.data);
export const updateBook = async (book, id) => await api.put(`/books/${id}`, book, getHeaders());
export const deleteBookById = async (id) => await api.delete(`/books/${id}`, {}, getHeaders());

export const createLoan = async (loan) => await api.post('/loans', loan, getHeaders());
export const searchLoans = params => api.get('/loans', params, getHeaders()).then(response => response.data);
export const getLoanById = id => api.get(`/loans/${id}`, {}, getHeaders()).then(response => response.data);
export const updateLoan = async (loan, id) => await api.put(`/loans/${id}`, loan, getHeaders());
export const deleteLoanById = async (id) => await api.delete(`/loans/${id}`, {}, getHeaders());

export const login = async (user) => {
  const userLogin = { ...user, strategy: 'local' };
  return await api.post('/authentication', userLogin);
};
