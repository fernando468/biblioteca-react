import {
  makeStyles
} from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  list: {
    marginTop: '25px'
  },
  accordion: {
    marginTop: '15px'
  },
  operations: {
    display: 'flex',
    flexDirection: 'row'
  },
  iconDelete: {
    color: theme.palette.warning.main
  },
  titleRelations: {
    marginTop: '15px',
    marginBottom: '15px',
  },
  descriptionRelations: {
    marginTop: '10px'
  },
  alignCenter: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '25px',
    marginBottom: '150px'
  }
}));
