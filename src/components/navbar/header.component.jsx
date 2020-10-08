import {
  AppBar,
  Avatar,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  List,
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
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import SpeedIcon from "@material-ui/icons/Speed";

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

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
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
            {props.shopName}
          </Typography>
          <Divider
            orientation="vertical"
            flexItem
            style={{ marginLeft: "auto" }}
          />
          {props.isSignIn ? (
            <Button className={classes.buttonToolbar}>
              <Avatar className={classes.user} style={{ marginRight: "5px" }}>
                {props.user.name[0]}
              </Avatar>
              <Typography variant="button" className={classes.user}>
                {props.user.name}
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
          paper: clsx(classes.paper, {
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
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <SpeedIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div className={classes.toolbar} />
    </div>
  );
};

// const drawerWidth = 240;

// const useStyle = makeStyles((theme) => ({
//   toolbarMargin: {
//     ...theme.mixins.toolbar,
//     marginBottom: "3em",
//   },
//   buttonToolbar: {
//     "&:hover": {
//       backgroundColor: "transparent",
//     },
//     fontFamily: "Raleway",
//     fontSize: "1em",
//   },
//   rightMenu: {
//     marginLeft: "auto",
//   },
//   user: {
//     fontFamily: "Pacifico",
//     textTransform: "none",
//   },
//   drawer: {
//     width: drawerWidth,
//     flexShrink: 0,
//     whiteSpace: "nowrap",
//   },
//   drawerOpen: {
//     width: drawerWidth,
//     transition: theme.transitions.create("width", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   },
//   drawerClose: {
//     transition: theme.transitions.create("width", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     overflowX: "hidden",
//     width: theme.spacing(7) + 1,
//     [theme.breakpoints.up("sm")]: {
//       width: theme.spacing(9) + 1,
//     },
//   },
//   menuButton: {
//     marginRight: 36,
//   },
// }));

// const Header = (props) => {
//   const classes = useStyle();
//   const [open, setOpen] = React.useState(false);

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   return (
//     <React.Fragment>
//       <AppBar color="transparent" elevation={1}>
//         <Toolbar>
//           <Button disableRipple className={classes.buttonToolbar}>
//             {props.shopName}
//           </Button>
//           <Divider
//             orientation="vertical"
//             flexItem
//             className={classes.rightMenu}
//           />
//           {props.isSignIn ? (
//             <Button className={classes.buttonToolbar}>
//               <Avatar className={classes.user} style={{ marginRight: "5px" }}>
//                 {props.user.name[0]}
//               </Avatar>
//               <Typography variant="button" className={classes.user}>
//                 {props.user.name}
//               </Typography>
//               <ExpandMoreIcon />
//             </Button>
//           ) : (
//             <Button className={classes.buttonToolbar}>Masuk</Button>
//           )}
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         variant="permanent"
//         className={clsx(classes.drawer, {
//           [classes.drawerOpen]: open,
//           [classes.drawerClose]: !open,
//         })}
//         classes={{
//           paper: clsx({
//             [classes.drawerOpen]: open,
//             [classes.drawerClose]: !open,
//           }),
//         }}
//       >
//       <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             className={clsx(classes.menuButton, {
//               [classes.hide]: open,
//             })}
//           >
//             <MenuIcon />
//           </IconButton>
//       </Drawer>
//       <div className={classes.toolbarMargin} />
//     </React.Fragment>
//   );
// };

export default Header;
