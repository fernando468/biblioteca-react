import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 260;

export const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  header: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    }
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor: '#fff'
  },
  menuButton: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  list: {
    marginTop: '25px'
  },
  listItem: {
    color: '#fff',
    textDecoration: 'none'
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.primary.dark,
  },
  titleSidebar: {
    color: '#fff',
    marginTop: '5px',
    fontSize: '30px'
  },
  buttonSignOut: {
    backgroundColor: '#fff'
  },
  content: {
    flexGrow: 1,
    marginTop: '100px'
  },
  alignCenter: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  logo: {
    width: '30%',
    marginTop: '20px'
  }
}));
