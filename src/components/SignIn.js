import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
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
    width: '100%', 
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

function SignIn({ onExistingProfileLogIn }) {
  const classes = useStyles();

  const [enteredProfile, setEnteredProfile] = useState("")
  const [anchorEl, setAnchorEl] = React.useState(null);

  const history = useHistory()

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const verifyProfile = (e, users, addedProfile) => {
    let allUsers = users.map(profile => profile.profileName)
    let currentUser = addedProfile.profileName
    if (allUsers.includes(currentUser)) {
      onExistingProfileLogIn(currentUser)
      history.goBack()
    } else {
      setAnchorEl(e.target);
    }
  } 

  const newProfileSubmit = (e) => {
    e.preventDefault();
    const addedProfile = {
      profileName: enteredProfile
    }
    fetch('http://localhost:3000/users')
    .then(response => response.json())
    .then(users => verifyProfile(e, users, addedProfile))  
  }

  const handleProfileName = (e) => {
    setEnteredProfile(e.target.value)
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
        <form onSubmit={newProfileSubmit} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Enter your existing profile name"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleProfileName}
            value={enteredProfile}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Go To Galactic Gallery
          </Button>
          <Grid container>
            <Grid item>
              <Link className="blue-font" to="/signup" variant="body2">
                Don't have a profile? Create one!
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
        <Typography className={classes.typography}>{enteredProfile} does not exist. Please try again.</Typography>
      </Popover>
    </>
  );
}

export default SignIn;
