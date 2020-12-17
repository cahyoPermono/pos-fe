import {
  AppBar,
  Avatar,
  Button,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  List,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SpeedIcon from "@material-ui/icons/Speed";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import PostAddIcon from "@material-ui/icons/PostAdd";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  logo: {
    fontFamily: "Raleway",
    textTransform: "uppercase",
  },
  user: {
    fontFamily: "Pacifico",
    textTransform: "none",
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogOut = () => {
    setAnchorEl(null);
    props.handleLogOut();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navbarItems = [
    {
      id: 1,
      icon: <SpeedIcon />,
      name: "Dashboard",
      show: props.isMod,
      path: "/",
    },
    {
      id: 2,
      icon: <CreditCardIcon />,
      name: "Transaction",
      show: true,
      path: "/transaction",
    },
    {
      id: 3,
      icon: <PostAddIcon />,
      name: "Product",
      show: props.isAdmin,
      path: "/product",
    },
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <AppBar
        style={{ backgroundColor: "white" }}
        color="inherit"
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.logo}>
            TOKO SENTOSA
          </Typography>
          <Divider
            orientation="vertical"
            flexItem
            style={{ marginLeft: "auto" }}
          />
          {props.currentUser ? (
            <Button className={classes.buttonToolbar} onClick={handleClick}>
              <Avatar className={classes.user} style={{ marginRight: "5px" }}>
                {props.currentUser.username.toUpperCase()[0]}
              </Avatar>
              <Typography variant="button" className={classes.user}>
                {props.currentUser.username.toUpperCase()}
              </Typography>
              <ExpandMoreIcon />
            </Button>
          ) : (
            <Button className={classes.buttonToolbar}>Masuk</Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {navbarItems.map((item) => {
            return item.show === true ? (
              <Link
                key={item.id}
                to={item.path}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <ListItem button>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              </Link>
            ) : null;
          })}
        </List>
        <Divider />
      </Drawer>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem name="logout" onClick={handleLogOut}>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Header;
