import { IconButton, InputBase, makeStyles, Paper } from "@material-ui/core";
import React, { useState } from "react";

import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
    marginBottom: "5px",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function SearchBox(props) {
  const classes = useStyles();

  const [value, setValue] = useState("");

  function handleChange(e) {
    const { value } = e.target;

    setValue(value);

    props.handleSearch(value);
  }

  return (
    <div>
      <Paper className={classes.root}>
        <InputBase
          autoFocus
          className={classes.input}
          placeholder={props.placeholder}
          inputProps={{ "aria-label": props.placeholder }}
          onChange={handleChange}
          value={value}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  );
}
