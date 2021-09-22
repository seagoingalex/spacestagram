import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
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

function SignUp({ onNewProfileSubmit }) {
  const classes = useStyles();
  const [newProfile, setNewProfile] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const history = useHistory();

  const handleNewProfile = (e) => {
    setNewProfile(e.target.value)
  }

  const [allUsers, setAllUsers] = useState([])

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  useEffect(() => {
  fetch('http://localhost:3001/users')
  .then(res => res.json())
  .then(user => setAllUsers(user))
  }, [])

  const newProfileSubmit = (e) => {
    e.preventDefault();
    const addedProfile = {
      profileName: newProfile
    }
    const userMap = allUsers.map(profile => profile.profileName)
    if (userMap.includes(newProfile)) {
      setAnchorEl(e.target);
    } else {
      fetch('http://localhost:3001/users', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(addedProfile)
    })
    onNewProfileSubmit(newProfile)
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
        <form onSubmit={newProfileSubmit} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="uName"
                name="userName"
                variant="outlined"
                required
                fullWidth
                id="userName"
                label="Create a name for your profile here"
                autoFocus
                onChange={handleNewProfile}
              />{newProfile}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create Profile!
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link className="blue-font" to="/signin" variant="body2">
                Already have a profile? Sign in
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
        <Typography className={classes.typography}>{newProfile} has already been selected. Please choose another name.</Typography>
      </Popover>
    </>
  );
}

export default SignUp;