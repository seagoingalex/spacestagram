//Have to run the 2 command below to make the page show poperly on your browser 
//npm install @material-ui/core 
//npm install @material-ui/icons

import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom'
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  typography: {
    padding: theme.spacing(2),
    color: "black"
    },
}));

function SignIn({ onExistingTeamLogIn }) {
  const classes = useStyles();

  const [enteredTeam, setEnteredTeam] = useState("")
  const [anchorEl, setAnchorEl] = React.useState(null);

  const history = useHistory()

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const verifyTeam = (e, users, addedTeam) => {
    let allUsers = users.map(team => team.teamName)
    let currentUser = addedTeam.teamName
    if (allUsers.includes(currentUser)) {
      onExistingTeamLogIn(currentUser)
      history.goBack()
    } else {
      setAnchorEl(e.target);
    }
  } 

  const newTeamSubmit = (e) => {
    e.preventDefault();
    const addedTeam = {
      teamName: enteredTeam
    }
    fetch('http://localhost:3000/users')
    .then(response => response.json())
    // .then(users => console.log(users))  
    .then(users => verifyTeam(e, users, addedTeam))  
    // onNewTeamSubmit(addedTeam)
    // history.push("/team")
  }

  const handleTeamName = (e) => {
    setEnteredTeam(e.target.value)
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
    <Container component="main" maxWidth="xs" className="signInPage" >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h3" className="black-font" >
          Sign in
        </Typography>
        <form onSubmit={newTeamSubmit} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Enter your existing team name"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleTeamName}
            value={enteredTeam}
          />
          {/* <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            GO BUILD MY TEAM
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Link className="blue-font" to="/signup" variant="body2">
                Don't have a team? Create one!
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
        <Typography className={classes.typography}>{enteredTeam} does not exist. Please try again.</Typography>
      </Popover>
    </>
  );
}

export default SignIn;
