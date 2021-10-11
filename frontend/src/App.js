import { createTheme, MuiThemeProvider } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import Login from './Components/Login';
import Routes from './Routes/index.routes';
import './Utils/yupConfig';

const theme = createTheme({
  palette: {
    warning: {
      light: '#e57373',
      main: '#f44336',
      dark: '#b71c1c',
      contrastText: '#fff',
    }
  },
});

function App() {
  const [token, setTokenState] = useState(null);

  useEffect(() => {
    getToken();
  }, []);

  function setToken(params) {
    if (params !== null) {
      localStorage.setItem('token', params);
      getToken();
    } else {
      localStorage.removeItem('token');
      getToken();
    }
  }

  function getToken() {
    const token = localStorage.getItem('token');
    setTokenState(token);
  }

  const isLogged = token !== null;

  return (
    <MuiThemeProvider theme={theme}>
      {isLogged ? <Routes setToken={setToken} /> : <Login setToken={setToken} />}
    </MuiThemeProvider>
  );
}

export default App;
