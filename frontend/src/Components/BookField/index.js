import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { searchBooks } from '../../Service/api';

export default function BookField(props) {
  const [books, setBooks] = useState([]);
  const errorMessage = props?.meta?.error;
  const shoudShowError = !!errorMessage && props?.meta?.touched;

  useEffect(() => {
    searchBooks({})
      .then(response => setBooks(response.data));
  }, []);

  function idFromBook(book) {
    return book ? book.id : null;
  }

  function bookFromId(id) {
    return books.find(book => book.id === id) || null;
  }

  return (
    <>
      <Autocomplete
        value={bookFromId(props?.input?.value)}
        onChange={(ev, book) => props?.input?.onChange(idFromBook(book))}
        options={books}
        getOptionLabel={(book) => book.title || ''}
        renderInput={(params) => <TextField {...params} error={shoudShowError} label={props.label} variant="outlined" />}
      />
      <span style={{ color: '#ff0000', display: 'flex' }}>
        {shoudShowError && errorMessage}
      </span>
    </>
  );
}
