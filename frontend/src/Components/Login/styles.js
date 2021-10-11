import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  container: {
    backgroundColor: '#fafafa',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    width: '100%'
  },
  form: {
    backgroundColor: '#fff',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.30)',
    borderRadius: '5px',
    padding: '35px',
    width: '30%',
    height: '30%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-between'
  },
  titleForm: {
    marginTop: '15px',
    marginBottom: '15px',
    fontSize: '28px',
    textAlign: 'center'
  },
});
