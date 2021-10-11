import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  table: {
    marginTop: '25px'
  },
  operations: {
    display: 'flex',
    flexDirection: 'row'
  },
  button: {
    marginTop: '25px'
  },
  card: {
    marginTop: '25px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  iconDelete: {
    color: theme.palette.warning.main
  },
  alignCenter: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '25px',
    marginBottom: '150px'
  }
}));
