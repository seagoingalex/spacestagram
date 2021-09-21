//Have to run the 2 command below to make the page show poperly on your browser 
//npm install @material-ui/core 
//npm install @material-ui/icons

import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Popover from '@material-ui/core/Popover'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  typography: {
    padding: theme.spacing(2),
    color: "black"
  },
  
}));

function SignUp({ onNewTeamSubmit }) {
  const classes = useStyles();
  const [newTeam, setNewTeam] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const history = useHistory();

  const handleNewTeam = (e) => {
    setNewTeam(e.target.value)
  }

  const [allUsers, setAllUsers] = useState([])

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  useEffect(() => {
  fetch('http://localhost:3000/users')
  .then(res => res.json())
  .then(user => setAllUsers(user))
  }, [])

  const newTeamSubmit = (e) => {
    e.preventDefault();
    const addedTeam = {
      teamName: newTeam
    }
    const userMap = allUsers.map(team => team.teamName)
    if (userMap.includes(newTeam)) {
      setAnchorEl(e.target);
    } else {
      fetch('http://localhost:3000/users', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(addedTeam)
    })
    onNewTeamSubmit(newTeam)
    history.push("/")
    }
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
    <Container component="main" maxWidth="xs" className="signUpPage">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h3" className="black-font">
          Sign up
        </Typography>
        <form onSubmit={newTeamSubmit} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="uName"
                name="userName"
                variant="outlined"
                required
                fullWidth
                id="userName"
                label="Create a name for your team here"
                autoFocus
                onChange={handleNewTeam}
              />{newTeam}
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create Team!
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link className="blue-font" to="/signin" variant="body2">
                Already have a team? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.typography}>{newTeam} has already been selected. Please choose another name.</Typography>
      </Popover>
    </>
  );
}

export default SignUp;