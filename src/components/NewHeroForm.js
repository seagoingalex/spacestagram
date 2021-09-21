import React, { useState } from "react";
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

//uuid randomly generates an id. You might need to run
// npm i react-uuid in the command line first!
import uuid from 'react-uuid'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    typography: {
        padding: theme.spacing(2),
        color: "black"
      },
  }));

function NewHeroForm({ currentTeam, isLoggedIn }) {
    const [heroName, setHeroName] = useState("")
    const [heroImage, setHeroImage] = useState("")
    const [heroDescription, setHeroDescription] = useState("")
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorLa, setAnchorLa] = React.useState(null);

    const classes = useStyles();

    let history = useHistory();

    function handleHeroNameInput(e) {
        setHeroName(e.target.value)
    }

    function handleHeroImageInput(e) {
        setHeroImage(e.target.value)
    }

    function handleHeroDescriptionInput(e) {
        setHeroDescription(e.target.value)
    }

    function heroFormSubmit(e) {
        e.preventDefault();
        if (isLoggedIn && heroName && heroImage && heroDescription) {
        const newHero = {
            name: heroName,
            image: heroImage,
            description: heroDescription,
            userId: currentTeam,
            heroId: uuid()
        }
        // onHeroFormSubmit(newHero)
        fetch("http://localhost:3000/teamMember", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newHero)
        })
        history.push("/team")
        } else if (!isLoggedIn) {
            setAnchorEl(e.currentTarget)
        } else if (!heroName || !heroImage || !heroDescription) {
            setAnchorLa(e.currentTarget)
        }
    }

    const handleClose = () => {
        setAnchorEl(null);
        setAnchorLa(null)
      };

      const open = Boolean(anchorEl);
      const submitId = open ? 'simple-popover' : undefined;
      const open2 = Boolean(anchorLa);
      const textFieldId = open2 ? 'simple-popover' : undefined;

  return (
    <>
    <div className="form-div">
        <br></br>
        <h1 className="black-font">Create a hero</h1>
        <form className={classes.root} onSubmit={(e) => heroFormSubmit(e)}>
            <TextField id="outlined-basic" value={heroName} onChange={handleHeroNameInput} type="text" placeholder="Hero name"/><br/>
            <TextField id="outlined-basic" value={heroImage} onChange={handleHeroImageInput} type="text" placeholder="Hero image URL"/> <br/>
            <TextField id="outlined-basic" value={heroDescription} onChange={handleHeroDescriptionInput} type="text" placeholder="Tell us about your hero"/> <br/>
        
            <button type="submit" value="Add hero">Add Hero</button>
        </form>
    </div>
    <Popover
        id={submitId}
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
        <Typography className={classes.typography}>You must be signed in to create a new hero!</Typography>
      </Popover>
      <Popover
        id={textFieldId}
        open={open2}
        anchorEl={anchorLa}
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
        <Typography className={classes.typography}>Please make sure you have filled in all blank fields</Typography>
      </Popover>
    </>
  );
}

export default NewHeroForm;