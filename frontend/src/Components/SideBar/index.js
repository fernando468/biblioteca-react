import {
  AppBar,
  Button,
  CssBaseline,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import MenuIcon from '@material-ui/icons/Menu';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import PersonIcon from '@material-ui/icons/Person';
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/book.svg';
import { useStyles } from './styles';

export default function SideBar(props) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  function handleSignOut() {
    props.setToken(null);
  }

  const options = [{
    url: '/alunos',
    name: 'Alunos',
    icon: <PersonIcon className={classes.listItem} />
  }, {
    url: '/livros',
    name: 'Livros',
    icon: <MenuBookIcon className={classes.listItem} />
  }, {
    url: '/emprestimos',
    name: 'Emprestimos',
    icon: <LocalLibraryIcon className={classes.listItem} />
  }];

  const drawer = (
    <div>
      <div className={classes.alignCenter}>
        <img src={Logo} alt="Logo" className={classes.logo} />
        <Typography className={classes.titleSidebar} variant="h4" noWrap>Biblioteca</Typography>
      </div>
      <List className={classes.list}>
        {options.map((option, index) => (
          <ListItem key={index} className={classes.listItem} component={Link} to={option.url} button>
            <ListItemIcon>{option.icon}</ListItemIcon>
            <ListItemText primary={option.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.header}>
          <IconButton
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Button
            variant="contained"
            className={classes.buttonSignOut}
            onClick={handleSignOut}
            startIcon={<ExitToAppIcon />}
          >
            Sair
          </Button>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        {props.children}
      </main>
    </div>
  );
}
