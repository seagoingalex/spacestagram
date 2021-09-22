import React, { useState } from "react";
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

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

function NewApodForm({ currentProfile, isLoggedIn }) {
    const [apodTitle, setApodTitle] = useState("")
    const [apodImage, setApodImage] = useState("")
    const [apodExplanation, setApodExplanation] = useState("")
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorLa, setAnchorLa] = React.useState(null);

    const classes = useStyles();

    let history = useHistory();

    function handleApodTitleInput(e) {
      setApodTitle(e.target.value)
    }

    function handleApodImageInput(e) {
      setApodImage(e.target.value)
    }

    function handleApodExplanationInput(e) {
      setApodExplanation(e.target.value)
    }

    function apodFormSubmit(e) {
        e.preventDefault();
        if (isLoggedIn && apodTitle && apodImage && apodExplanation) {
        
        let today = new Date();  
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();
          
        today = yyyy + '-' + mm + '-' + dd;
        const newApod = {
            title: apodTitle,
            url: apodImage,
            explanation: apodExplanation,
            userId: currentProfile,
            date: today
        }
        fetch("http://localhost:3001/teamMember", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newApod)
        })
        // Still working out issue with pushing users to profile before the form-entered image gets POST'd.
        // history.push("/profile")
        history.push("/")
        } else if (!isLoggedIn) {
            setAnchorEl(e.currentTarget)
        } else if (!apodTitle || !apodImage || !apodExplanation) {
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
        <h1 className="black-font">Add your own space photography!</h1>
        <form className={classes.root} onSubmit={(e) => apodFormSubmit(e)}>
            <TextField id="outlined-basic" value={apodTitle} onChange={handleApodTitleInput} type="text" placeholder="Image title"/><br/>
            <TextField id="outlined-basic" value={apodImage} onChange={handleApodImageInput} type="text" placeholder="Image URL"/> <br/>
            <TextField id="outlined-basic" value={apodExplanation} onChange={handleApodExplanationInput} type="text" placeholder="Tell us about your image"/> <br/>
        
            <button type="submit" value="Add favorite">Add Custom Favorite</button>
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
        <Typography className={classes.typography}>You must be signed in to create a new galactic image!</Typography>
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

export default NewApodForm;